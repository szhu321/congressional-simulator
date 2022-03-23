import PlayerModel from "../model/PlayerModel";

export default class PlayerData
{
    /**
     * @type {PlayerModel}
     */
    player;

    constructor()
    {

    }

    getPlayer()
    {
        return this.player;
    }

    setPlayer(player)
    {
        this.player = player;
    }
}