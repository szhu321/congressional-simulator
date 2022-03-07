import DeckModel from "./DeckModel";

export default class BoardModel
{
    TURN = {PLAYER1: "player1", PLAYER2: "player2"};

    constructor()
    {
        //The draw deck and the discard deck.
        this.player1DrawDeck = new DeckModel();
        this.player1DiscardDeck = new DeckModel();
        this.player2DrawDeck = new DeckModel();
        this.player2DiscardDeck = new DeckModel();

        //The cards on the hand is what the player's can play each round.
        this.player1Hand = new DeckModel();
        this.player2Hand = new DeckModel();

        //The cards on the board is the cards the player have on action.
        this.player1Board = new DeckModel();
        this.player2Board = new DeckModel();

        //Other information
        this.player1Votes = 10;
        this.player2Votes = 10;

        this.player1Money = 0;
        this.player2Money = 0;

        //the game state.
        this.turn = this.TURN.PLAYER1;

        this.updateViewCallback = null;

        this.politicalStance = {
            ecomony : Math.round(((Math.random() * 2) - 1) * 100) / 100,
            healthcare : Math.round(((Math.random() * 2) - 1) * 100) / 100,
            education : Math.round(((Math.random() * 2) - 1) * 100) / 100,
            taxes : Math.round(((Math.random() * 2) - 1) * 100) / 100,
            environment : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        }
    }

    getPlayer1DrawDeck(){return this.player1DrawDeck}
    getPlayer2DrawDeck(){return this.player2DrawDeck}
    getPlayer1DiscardDeck(){return this.player1DiscardDeck}
    getPlayer2DiscardDeck(){return this.player2DiscardDeck}
    getPlayer1Hand(){return this.player1Hand}
    getPlayer2Hand(){return this.player2Hand}
    getPlayer1Board(){return this.player1Board}
    getPlayer2Board(){return this.player2Board}

    getPlayer1Votes(){return this.player1Votes}
    getPlayer2Votes(){return this.player2Votes}
    getPlayer1Money(){return this.player1Money}
    getPlayer2Money(){return this.player2Money}

    /**
     * @returns {{ecomony: Number, 
     * healthcare: Number,
     * education: Number,
     * taxes: Number,
     * environment: Number}}
     * The political stance of the tile the card game is played on.
     */
    getPoliticalStance(){return this.politicalStance}

    /**@param {Number} votes - The number of votes */
    setPlayer1Votes(votes){this.player1Votes = votes}
    /**@param {Number} votes - The number of votes */
    setPlayer2Votes(votes){this.player2Votes = votes}
    /**@param {Number} money - The number of votes */
    getPlayer1Money(money){this.player1Money = money}
    /**@param {Number} money - The number of votes */
    getPlayer2Money(money){this.player2Money = money}

    /**The return value is a string, can be player1 or player2 */
    getTurn(){return this.turn}

    /** Switches the player's turn. If it's player1's turn turn to player2 and viceversa. */
    switchTurn(){
        if(this.turn == this.TURN.PLAYER1)
            this.turn = this.TURN.PLAYER2;
        else
            this.turn = this.TURN.PLAYER1;
        this.updateView();
    }

    /**@param {String} turn - can be 'player1' or 'player2' */
    setTurn(turn){this.turn = turn}

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
