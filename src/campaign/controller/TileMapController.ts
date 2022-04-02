import EventDispatcher from "../../events/EventDispatcher";
import { CAMPAIGN_EVENTS } from "../campaignenum";
import TileMap from "../model/TileMap";
import Worker from "../model/Worker";

export default class TileMapController
{
    private scene: Phaser.Scene;
    private mapModel: TileMap;

    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
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

    public passTime(daysPassed: number)
    {
        if(!this.mapModel)
        {
            console.error("MapController does not have a MapModel");
            return;
        }
        let votesPerday = 1;
        let neighborsVotesPerday = 0.1;

        EventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.UPDATE_WORKER_ON_MAP, this.mapModel, daysPassed);

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
