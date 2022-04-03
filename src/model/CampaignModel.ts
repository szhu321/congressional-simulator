import TileMap from "../campaign/model/TileMap";

/**
 * Global Data Relating to the campaign game.
 * To update this model call emit the event UPDATE_GLOBAL_CAMPAIGN_DATA.
 */
export default class CampaignModel
{
    private mapModel: TileMap;

    constructor()
    {
        this.mapModel = null;
    }

    public getMapModel(): TileMap {return this.mapModel;}
    public setMapModel(value: TileMap) {this.mapModel = value;}
}