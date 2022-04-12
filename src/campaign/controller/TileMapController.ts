import PlayerData from "../../data/PlayerData";
import EventDispatcher from "../../events/EventDispatcher";
import { GAME_EVENTS } from "../../gameenums";
import { CAMPAIGN_EVENTS, CANDIDATE, TILE_POSITION, WORKER_TYPE } from "../campaignenum";
import CampaignEventDispatcher from "../CampaignEventDispatcher";
import TileMap from "../model/TileMap";
import Worker from "../model/Worker";

export default class TileMapController
{
    private scene: Phaser.Scene;
    private mapModel: TileMap;

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        EventDispatcher.getInstance().on(GAME_EVENTS.UPDATE_GLOBAL_CAMPAIGN_DATA, () => {
            PlayerData.getCampaignData().setMapModel(this.mapModel);
        });
    }

    public getScene(): Phaser.Scene {return this.scene;}

    public setMapModel(value: TileMap) {this.mapModel = value;}
    public getMapModel(): TileMap {return this.mapModel;}

    // public updateWorkersOnMap()
    // {
       
    // }

    /**
     * Add a worker to a tile.
     */
    public addWorkerToTile(worker: Worker, row: number, col: number)
    {
        if(!this.mapModel)
        {
            console.error("MapController does not have a MapModel");
            return;
        }
        let tile = this.mapModel.getTileAt(row, col);
        tile.addWorker(worker);
    }

    private aiDaysPassed: number = 0;

    public runAi(daysPassed: number)
    {
        this.aiDaysPassed += daysPassed;
        //console.log("running campaign ai");
        // if(this.aiDaysPassed % 2 === 0)
        // {
            CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER, 
                WORKER_TYPE.COLD_CALLER, CANDIDATE.OPPONENT, TILE_POSITION.RAMDOM_TILE);
        // }
    }

    public passTime(daysPassed: number)
    {
        if(!this.mapModel)
        {
            console.error("MapController does not have a MapModel");
            return;
        }
        // let votesPerday = 1;
        // let neighborsVotesPerday = 0.1;

        CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.UPDATE_WORKER_ON_MAP, this.mapModel, daysPassed);

        this.runAi(daysPassed);

        //

        // //for every tile that has a worker, add a vote and add a vote to the surrounding tiles
        // for(let i = 0; i < this.mapModel.getRows(); i++)
        // {
        //     for(let j = 0; j < this.mapModel.getCols(); j++)
        //     {
        //         let tile = this.mapModel.getTileAt(i, j);
        //         if(tile)
        //         {
        //             if(tile.isFullyOccupied())
        //             {
        //                 let neighbors = this.mapModel.getAllNeighbors(tile);
        //                 for(let i = 0; i < neighbors.length; i++)
        //                 {
        //                     if(neighbors[i])
        //                     {
        //                         neighbors[i].occupy("player", neighborsVotesPerday * daysPassed);
        //                     }
        //                 }
        //             }
        //             if(tile.isWorkerOnTile() === true)
        //             {
        //                 tile.occupy("player", votesPerday * daysPassed);
        //             }
        //         }
        //     }
        // }
    }
}
