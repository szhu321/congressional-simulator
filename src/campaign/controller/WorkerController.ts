import EventDispatcher from "../../events/EventDispatcher";
import { CAMPAIGN_EVENTS } from "../campaignenum";
import TileMap from "../model/TileMap";
import Worker from "../model/Worker";

export default class WorkerController
{
    private worker: Worker;

    constructor()
    {
        EventDispatcher.getInstance().on(CAMPAIGN_EVENTS.UPDATE_WORKER_ON_MAP, this.updateWorkerOnMapHandler, this);
    }

    public updateWorkerOnMapHandler(mapModel: TileMap, daysPassed: number)
    {
        //check to see if the worker has been set to work on the map.
        if(this.worker.isWorking())
        {
            let tileRow = this.worker.getTileRow();
            let tileCol = this.worker.getTileCol();
            let tile = mapModel.getTileAt(tileRow, tileCol);
            tile.occupy(this.worker.getCandidate(), this.worker.getPersuasivePower() * daysPassed);

            //influence the surrounding tiles.
            let neighbors = mapModel.getAllNeighbors(tile);
            for(let i = 0; i < neighbors.length; i++)
            {
                if(neighbors[i])
                {
                    neighbors[i].occupy(this.worker.getCandidate(), this.worker.getInfluencePower() * daysPassed);
                }
            }
        }
    }


    public getWorker(): Worker{return this.worker;}
    public setWorker(value: Worker) {this.worker = value;}
}