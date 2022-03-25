import TileMap from "../model/TileMap";

export default class MapController
{
    private scene: Phaser.Scene;
    private mapModel: TileMap;

    constructor(scene: Phaser.Scene, mapModel: TileMap)
    {
        this.scene = scene;
        this.mapModel = mapModel;
    }

    public getScene(): Phaser.Scene {return this.scene;}

    public setMapModel(value: TileMap) {this.mapModel = value;}
    public getMapModel(): TileMap {return this.mapModel;}

    public addWorkerToTile(row: number, col: number)
    {
        if(!this.mapModel)
        {
            console.error("MapController does not have a MapModel");
            return;
        }
        let tile = this.mapModel.getTileAt(row, col);
        tile.setWorkerOnTile(true);
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
        //for every tile that has a worker, add a vote and add a vote to the surrounding tiles
        for(let i = 0; i < this.mapModel.getRows(); i++)
        {
            for(let j = 0; j < this.mapModel.getCols(); j++)
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
                    if(tile.isWorkerOnTile() === true)
                    {
                        tile.occupy("player", votesPerday * daysPassed);
                    }
                }
            }
        }
    }
}
