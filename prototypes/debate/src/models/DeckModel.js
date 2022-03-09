import CardModel from "./CardModel";

export default class DeckModel
{
    /**
     * @type {CardModel[]} - The array of cards.
     */
    deck;
    /**
     * @type {Number} - The number of cards in the deck.
     */
    cardCount;

    constructor()
    {
        this.deck = [];
        this.cardCount = 0;
        this.updateViewCallback = null;
    }

    /**
     * Get all the cards in this deck.
     * @returns {CardModel[]} the array of cards.
     */
    getCards()
    {
        return this.deck;
    }

    /**
     * Gets a card at the specified index.
     * @param idx - the index of the card to get.
     * @returns {CardModel} The card. null if index is out of bounds.
     */
    getCardAt(idx)
    {
        if(idx < 0 || idx >= this.deck.length)
            return null;
        return this.deck[idx];
    }

    /**
     * Add a card to the end of the deck.
     * @param {CardModel} card - The card to add to this deck.
     */
    addCard(card)
    {
        if(card)
        {
            this.cardCount++;
            this.deck.push(card);
            this.updateView();
        }
    }

    /**
     * Inserts a card at the specifed location.
     * @param {CardModel} card - the card to insert.
     * @param {Number} idx - the idx to insert at (0 - deck.length).
     */
    insertCard(card, idx)
    {
        if(card)
        {
            if(!idx)
            {
                this.addCard(card);
            }
            else
            {
                this.deck.splice(idx, 0, [card]);
                this.updateView();
            }
        }
    }

    /**
     * 
     * @returns {CardModel} The first card on the deck, undefined if the deck is empty.
     */
    removeFirst()
    {
        let card = this.deck.pop();
        if(card)
            this.cardCount--;
        this.updateView();
        return card;
    }

    /**
     * @param idx - the index of the card to remove.
     * @returns {CardModel} The card that was removed. null if index is out of bounds.
     */
    removeAtIdx(idx)
    {
        if(idx < 0 || idx >= this.deck.length)
            return null;
        let card = this.deck.splice(idx, 1)[0];
        if(card)
            this.cardCount--;
        this.updateView();
        return card;
    }

    /**
     * @returns {CardModel[]} - all the cards that were removed.
     */
    removeAllCards()
    {
        let cards = [];
        while(this.deck.length > 0)
        {
            cards.push(this.deck.pop());
            this.cardCount--;
        }
        this.updateView();
        return cards;
    }

    /**
     * Adds an array of cards to the deck.
     * @param {CardModel[]} cards - all the cards that are to be added to the deck.
     */
    addAllCards(cards)
    {
        for(let i = 0; i < cards.length; i++)
        {
            this.deck.push(cards[i]);
            this.cardCount++;
        }
        this.updateView();
    }

    /**
     * Shuffles the deck. Very cool.
     */
    shuffle()
    {
        for(let i = 0; i < this.deck.length - 1; i++)
        {
            let swapIndex = Math.floor(Math.random() * (this.deck.length - i)) + i;
            let temp = this.deck[i];
            this.deck[i] = this.deck[swapIndex];
            this.deck[swapIndex] = temp;
        }
        this.updateView();
    }

    /**
     * The updateViewCallback is a function that can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} updateViewCallback - The function that is called when this model gets updated.
     */
    setUpdateViewCallback(updateViewCallback)
    {
        this.updateViewCallback = updateViewCallback;
    }

    updateView()
    {
        if(this.updateViewCallback)
            this.updateViewCallback(this);
    }

}