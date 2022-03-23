import PlayerModel from "../model/PlayerModel";

export default class PlayerData
{
    /**
     * @type {PlayerModel}
     */
    static #player;

    /**
     * Gets the singleton player model.
     * @returns {PlayerModel} - the player model.
     */
    static getPlayer()
    {
        if(!PlayerData.#player)
            PlayerData.#player = new PlayerModel();
        return this.#player;
    }
}