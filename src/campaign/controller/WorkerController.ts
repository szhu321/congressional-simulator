import PlayerData from "../../data/PlayerData";
import { CAMPAIGN_EVENTS, CANDIDATE } from "../campaignenum";
import CampaignEventDispatcher from "../CampaignEventDispatcher";
import TileMap from "../model/TileMap";
import Worker from "../model/Worker";

export default class WorkerController
{
    private worker: Worker;

    constructor()
    {
        CampaignEventDispatcher.getInstance().on(CAMPAIGN_EVENTS.UPDATE_WORKER_ON_MAP, this.updateWorkerOnMapHandler, this);
    }

    public updateWorkerOnMapHandler(mapModel: TileMap, daysPassed: number)
    {
        //check to see if the worker has been set to work on the map.
        if(this.worker.isWorking())
        {
            let tileRow = this.worker.getTileRow();
            let tileCol = this.worker.getTileCol();
            let tile = mapModel.getTileAt(tileRow, tileCol);


            let persuasivePower = this.worker.getPersuasivePower();

            if(this.worker.getCandidate() === CANDIDATE.PLAYER)
            {
                persuasivePower += PlayerData.getPlayer().getPartyPopularity();
            }
            if(persuasivePower <= 0)
            {
                persuasivePower = 1;
            }
            tile.occupy(this.worker.getCandidate(), persuasivePower * daysPassed);

            //influence the surrounding tiles.
            let neighbors = mapModel.getAllNeighbors(tile);
            for(let i = 0; i < neighbors.length; i++)
            {
                if(neighbors[i])
                {
                    let count = neighbors[i].occupy(this.worker.getCandidate(), this.worker.getInfluencePower() * daysPassed);
                    //console.log(count);
                }
            }
        }
    }


    public getWorker(): Worker{return this.worker;}
    public setWorker(value: Worker) {this.worker = value;}
}