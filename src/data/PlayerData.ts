import CampaignModel from "../model/CampaignModel";
import GameModel from "../model/GameModel";
import PlayerModel from "../model/PlayerModel";

export default class PlayerData
{
    private static player: PlayerModel;
    private static gameData: GameModel;
    private static campaignData: CampaignModel;

    /**
     * Gets the singleton player model.
     * @returns {PlayerModel} - the player model.
     */
    static getPlayer(): PlayerModel
    {
        if(!PlayerData.player)
            PlayerData.player = new PlayerModel();
        return this.player;
    }

    /**
     * Gets the singleton player model.
     * @returns {GameModel} - the game model.
     */
    static getGameData(): GameModel
    {
        if(!PlayerData.gameData)
            PlayerData.gameData = new GameModel();
        return this.gameData;
    }

    static getCampaignData(): CampaignModel
    {
        if(!PlayerData.campaignData)
            PlayerData.campaignData = new CampaignModel();
        return this.campaignData;
    }
}