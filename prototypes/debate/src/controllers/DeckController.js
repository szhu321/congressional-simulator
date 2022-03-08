import CardModel from "../models/CardModel";
import DeckModel from "../models/DeckModel";

export default class DeckController
{
    model;

    /**
     * @param {DeckModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new DeckModel();
    }

    /**Suffles the deck */
    shuffle()
    {
        this.model.shuffle();
    }

    /**
     * Removes the first card from the deck (last element in the deck array). 
     * This is equivalent to drawing a card from the top of the deck.
     * @returns {CardModel} The card that was removed. null if the deck is empty.
     */
    removeFirst()
    {
        return this.model.removeFirst();
    }

    /**
     * 
     * @param {Number} idx - the index of the card to remove
     * @returns {CardModel} - The card model that was removed. null if no card was removed.
     */
    removeAtIdx(idx)
    {
        let card = this.model.removeAtIdx(idx);
        if(card) return card;
        return null;
    }


    /**
     * Adds a card to the end of the deck.
     * @param {CardModel} card - The card to insert.
     */
    addCard(card)
    {
        this.model.addCard(card);
    }

    /**
     * Inserts a card at the given index.
     * @param {CardModel} card - The card to insert.
     * @param {Number} idx - The index of the card.
     */
    insertCard(card, idx)
    {
        this.model.insertCard(card, idx);
    }
}