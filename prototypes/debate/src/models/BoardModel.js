import DeckModel from "./DeckModel";

export default class BoardModel
{


    constructor()
    {
        this.player1DrawDeck = new DeckModel();
        this.player1DiscardDeck = new DeckModel();
        this.player2DrawDeck = new DeckModel();
        this.player2DiscardDeck = new DeckModel();

        this.player1Hand = new DeckModel();
        this.player2Hand = new DeckModel();

        this.player1Board = new DeckModel();
        this.player2Board = new DeckModel();

        //TODO: players hand and players play area.
        this.updateViewCallback = null;
    }

    getPlayer1DrawDeck(){return this.player1DrawDeck}
    getPlayer2DrawDeck(){return this.player2DrawDeck}
    getPlayer1DiscardDeck(){return this.player1DiscardDeck}
    getPlayer2DiscardDeck(){return this.player2DiscardDeck}
    getPlayer1Hand(){return this.player1Hand}
    getPlayer2Hand(){return this.player2Hand}
    getPlayer1Board(){return this.player1Board}
    getPlayer2Board(){return this.player2Board}

    /**.
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
        {
            this.updateViewCallback(this);
        }
    }
}
