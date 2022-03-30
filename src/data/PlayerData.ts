import PlayerModel from "../model/PlayerModel";

export default class PlayerData
{
    private static player: PlayerModel;

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
}