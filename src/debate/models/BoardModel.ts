import DeckModel from "./DeckModel";
import BoardView from "../views/BoardView"

export enum TURN {PLAYER1 = "player1", PLAYER2 = "player2"};

export default class BoardModel
{
    private player1DrawDeck: DeckModel;
    private player1DiscardDeck: DeckModel;
    private player2DrawDeck: DeckModel;
    private player2DiscardDeck: DeckModel;
    private player1Hand: DeckModel;
    private player2Hand: DeckModel;
    private player1Board: DeckModel;
    private player2Board: DeckModel;
    private player1Votes: number;
    private player2Votes: number;
    private player1Money: number;
    private player2Money: number;
    private turn: TURN;
    private view: BoardView;

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
        this.turn = TURN.PLAYER1;

        this.view = null;

        // this.politicalStance = {
        //     ecomony : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        //     healthcare : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        //     education : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        //     taxes : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        //     environment : Math.round(((Math.random() * 2) - 1) * 100) / 100,
        // }
    }

    getPlayer1DrawDeck(){return this.player1DrawDeck}
    getPlayer2DrawDeck(){return this.player2DrawDeck}
    getPlayer1DiscardDeck(){return this.player1DiscardDeck}
    getPlayer2DiscardDeck(){return this.player2DiscardDeck}
    getPlayer1Hand(){return this.player1Hand}
    getPlayer2Hand(){return this.player2Hand}
    getPlayer1Board(){return this.player1Board}
    getPlayer2Board(){return this.player2Board}

    setPlayer1DrawDeck(player1DrawDeck: DeckModel){this.player1DrawDeck = player1DrawDeck}
    setPlayer2DrawDeck(player2DrawDeck: DeckModel){this.player2DrawDeck = player2DrawDeck}
    setPlayer1DiscardDeck(player1DiscardDeck: DeckModel){this.player1DiscardDeck = player1DiscardDeck}
    setPlayer2DiscardDeck(player2DiscardDeck: DeckModel){this.player2DiscardDeck = player2DiscardDeck}
    setPlayer1Hand(player1Hand: DeckModel){this.player1Hand = player1Hand}
    setPlayer2Hand(player2Hand: DeckModel){this.player2Hand = player2Hand}
    setPlayer1Board(player1Board: DeckModel){this.player1Board = player1Board}
    setPlayer2Board(player2Board: DeckModel){this.player2Board = player2Board}

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
    // getPoliticalStance(){return this.politicalStance}

    /**@param {Number} votes - The number of votes */
    setPlayer1Votes(votes: number){
        this.player1Votes = votes;
        this.updateView();
    }
    /**@param {Number} votes - The number of votes */
    setPlayer2Votes(votes: number){
        this.player2Votes = votes;
        this.updateView();
    }
    /**@param {Number} money - The number of votes */
    setPlayer1Money(money: number){
        this.player1Money = money;
        this.updateView();
    }
    /**@param {Number} money - The number of votes */
    setPlayer2Money(money: number){
        this.player2Money = money
        this.updateView();
    }

    /**
     * Transfer a certain amount of votes from player1 to player2.
     * @param {Number} amount - the amount of votes to transfer.
     */
    transferVotesPlayer1ToPlayer2(amount: number)
    {
        if(this.player1Votes - amount < 0)
        {
            let excess = Math.abs(this.player1Votes - amount);
            this.player1Votes -= amount - excess;
            this.player2Votes += amount - excess;
        }
        else
        {
            this.player1Votes -= amount;
            this.player2Votes += amount;
        }
        this.updateView();
    }

    /**
     * Transfer a certain amount of votes from player2 to player1.
     * @param {Number} amount - the amount of votes to transfer.
     */
    transferVotesPlayer2ToPlayer1(amount: number)
    {
        if(this.player2Votes - amount < 0)
        {
            let excess = Math.abs(this.player2Votes - amount);
            this.player2Votes -= amount - excess;
            this.player1Votes += amount - excess;
        }
        else
        {
            this.player2Votes -= amount;
            this.player1Votes += amount;
        }
        this.updateView();
    }

    /**
     * @returns {Boolean} True if at least one of the worker cards is on attacking mode.
     */
    isPlayer2OnOffensive(): boolean
    {
        let cards = this.getPlayer2Board().getCards();
        for(let i = 0; i < cards.length; i++)
        {
            let card = cards[i];
            if(card.getIsWorker() && card.getIsAttacking())
            {
                return true;
            }
        }
        return false;
    }

    /**
     * @returns {Boolean} True if at least one of the worker cards is on attacking mode.
     */
    isPlayer1OnOffensive(): boolean
    {
        let cards = this.getPlayer1Board().getCards();
        for(let i = 0; i < cards.length; i++)
        {
            let card = cards[i];
            if(card.getIsWorker() && card.getIsAttacking())
            {
                return true;
            }
        }
        return false;
    }

    /**
     * @returns {Boolean} True if at least one of the worker cards is on defense mode.
     */
    isPlayer1OnDefensive(): boolean
    {
        let cards = this.getPlayer1Board().getCards();
        for(let i = 0; i < cards.length; i++)
        {
            let card = cards[i];
            if(card.getIsWorker() && !card.getIsAttacking())
            {
                return true;
            }
        }
        return false;
    }


    /**
     * @returns {Boolean} True if at least one of the worker cards is on defense mode.
     */
    isPlayer2OnDefensive(): boolean
    {
        let cards = this.getPlayer2Board().getCards();
        for(let i = 0; i < cards.length; i++)
        {
            let card = cards[i];
            if(card.getIsWorker() && !card.getIsAttacking())
            {
                return true;
            }
        }
        return false;
    }

    

    /**The return value is a string, can be player1 or player2 */
    getTurn(){return this.turn}

    /** Switches the player's turn. If it's player1's turn turn to player2 and viceversa. */
    switchTurn(){
        if(this.turn == TURN.PLAYER1)
            this.turn = TURN.PLAYER2;
        else
            this.turn = TURN.PLAYER1;
        this.updateView();
    }

    /**@param {String} turn - can be 'player1' or 'player2' */
    setTurn(turn: TURN){
        this.turn = turn;
        this.updateView();
    }

    /**
     * The view has a function called updateViewCallback(model) can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} view - The view for this model.
     */
    setView(view: BoardView)
    {
        this.view = view;
    }

    getView(){
        return this.view;
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}
