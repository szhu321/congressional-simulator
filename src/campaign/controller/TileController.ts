import Tile from "../model/Tile";

export default class TileController
{
    private tile: Tile;

    constructor()
    {

    }

    public getTile(): Tile{return this.tile;}
    public setTile(value: Tile) {this.tile = value;}
}
