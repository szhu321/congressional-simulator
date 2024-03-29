import TileMap from "../model/tilemap";
import TitleScene from "../scenes/TitleScene";
import Phaser from "phaser";

export default class MapController
{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {TileMap} mapModel 
     */
    constructor(scene, mapModel)
    {
        this.scene = scene;
        this.mapModel = mapModel;
    }

    addWorkerToTile(row, col)
    {
        let tile = this.mapModel.getTileAt(row, col);
        tile.workerOnTile = true;
    }

    passTime(daysPassed)
    {
        let votesPerday = 1;
        let neighborsVotesPerday = 0.1;
        //for every tile that has a worker, add a vote and add a vote to the surrounding tiles
        for(let i = 0; i < this.mapModel.rows; i++)
        {
            for(let j = 0; j < this.mapModel.cols; j++)
            {
                let tile = this.mapModel.getTileAt(i, j);
                if(tile)
                {
                    if(tile.isFullyOccupied())
                    {
                        let neighbors = this.mapModel.getAllNeighbors(tile);
                        for(let i = 0; i < neighbors.length; i++)
                        {
                            if(neighbors[i])
                            {
                                neighbors[i].occupy("player", neighborsVotesPerday * daysPassed);
                            }
                        }
                    }
                    if(tile.workerOnTile == true)
                    {
                        tile.occupy("player", votesPerday * daysPassed);
                    }
                }
            }
        }
    }
}
