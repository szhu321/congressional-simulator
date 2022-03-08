import CardModel from "../models/CardModel";

export default class CardController
{
    model;

    /**
     * @param {CardModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new CardModel();
    }

    /**
     * Deal damage to this card. Will return true if this card dies.
     * @param {Number} damage - the damage that will be dealt to this card.
     * @returns {Boolean} true if the card was killed, false otherwise.
     */
    takeDamage(damage)
    {
        let health = this.model.getHealth();
        let newHealth = health - damage;
        if(newHealth <= 0) //if the card was killed, return true.
        {
            newHealth = 0;
            this.model.setHealth(newHealth);
            return true;
        }
        this.model.setHealth(newHealth);
        return false;
    }

    /**
     * Combines two cards. This will fail if one of the cards is already three star.
     * @param {CardModel} card1 - the first card.
     * @param {CardModel} card2 - the second card.
     * @returns {CardModel} The new card after combination. null if failed.
     */
    static getCombinedCard(card1, card2)
    {
        if(card1 && card2)
            
        return null;
    }
}