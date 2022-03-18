import Card from '../helpers/card';
import Zone from '../helpers/zone';
import CardView from '../views/CardView';
import Phaser from 'phaser';
import BoardView from '../views/BoardView';
import BoardController from '../controllers/BoardController';
import BoardModel from '../models/BoardModel';
import CardModel from '../models/CardModel';
import DeckModel from '../models/DeckModel';
import DeckView from '../views/DeckView';
import HandView from '../views/HandView';

export default class DebateScene extends Phaser.Scene {
    // constructor() {
    //     super({
    //         key: 'Game'
    //     });
    //     this.board;
    // }

    init() {
        this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
    }

    preload() {
        // this.load.image('issueCard', 'assets/issue_card.png');
        // this.load.image('workerCard', 'assets/worker_card.png');
        this.boardModel;
        this.boardView;
        this.boardController;
    }

    create() {
        this.boardModel = this.createBoard();
        this.boardController = new BoardController(this.boardModel);
        this.boardView = new BoardView(this);
        this.boardModel.view = this.boardView;
        this.boardView.controller = this.boardController;
        this.boardView.initialize(this.boardModel);
        this.boardModel.updateView();
        this.add.existing(this.boardView);
    }

    // update() {
    
    // }

    createDeck(){
        let deckModel = new DeckModel();
        let deckView = new DeckView(this);
        deckView.initialize();
        deckModel.setView(deckView);
        deckView.updateDisplay("");
        deckView.setInteractive(new Phaser.Geom.Rectangle(-1 * deckView.maxWidth / 2, 
            -1 * deckView.maxHeight / 2, deckView.maxWidth, deckView.maxHeight), Phaser.Geom.Rectangle.Contains);
        deckModel.updateView();
        return deckModel;
    }

    createHand(){
        let deckModel = new DeckModel();
        let deckView = new HandView(this);
        // deckView.initialize();
        deckModel.setView(deckView);
        // deckView.updateDisplay("");
        // deckView.setInteractive(new Phaser.Geom.Rectangle(-1 * deckView.maxWidth / 2, 
        //     -1 * deckView.maxHeight / 2, deckView.maxWidth, deckView.maxHeight), Phaser.Geom.Rectangle.Contains);
        deckModel.updateView();
        return deckModel;
    }

    createNewCard(jsonObject)
    {
        let cardModel = new CardModel();
        let cardView = new CardView(this);
        cardView.initialize();
        cardView.updateDisplay(["\u{2605}", "$100", "Environment Liberal", "When played deal 1 damage to a random opponent card", "1", "1"], true);
        cardView.setInteractive(new Phaser.Geom.Rectangle(-1 * cardView.maxWidth / 2, -1 * cardView.maxHeight / 2, cardView.maxWidth, cardView.maxHeight), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(cardView);
        // this.add.existing(cardView);
        cardModel.setView(cardView);
        cardModel.setConfig(jsonObject);
        cardModel.updateView();
        return cardModel;
        //model has been created.

        //we need the controller and the view.
        // let cardController = new CardController(cardModel);
        // let cardView = new CardView(this);
        // cardModel.setUpdateViewCallback(cardView.updateViewCallBack);
    }

    createBoard()
    {
        let boardModel = new BoardModel();

        //The draw deck and the discard deck.
        boardModel.player1DrawDeck = this.createDeck();
        boardModel.player1DiscardDeck = this.createDeck();
        boardModel.player2DrawDeck = this.createDeck();
        boardModel.player2DiscardDeck = this.createDeck();

        //The cards on the hand is what the player's can play each round.
        boardModel.player1Hand = this.createHand();
        boardModel.player2Hand = this.createHand();

        //The cards on the board is the cards the player have on action.
        boardModel.player1Board = this.createHand();
        boardModel.player2Board = this.createHand();
        
        boardModel.setPlayer1Money(300);
        boardModel.setPlayer2Money(300);
        
        boardModel.setPlayer1Votes(10);
        boardModel.setPlayer2Votes(10);

        boardModel.setTurn(boardModel.TURN.PLAYER1);

        //Create some cards.
        let cards = [];
        let cardsData = this.getCardData();
        for(let i = 0; i < cardsData.length; i++)
        {
            cards.push(this.createNewCard(cardsData[i]));
        }
        
        let cards2 = [];
        for(let i = 0; i < cardsData.length; i++)
        {
            let card = this.createNewCard(cardsData[i]);
            this.input.setDraggable(card.view, false);
            //card.view.disableInteractive();
            cards2.push(card);
        }

        boardModel.getPlayer1DrawDeck().addAllCards(cards);
        boardModel.getPlayer2DrawDeck().addAllCards(cards2);
        boardModel.getPlayer1DrawDeck().shuffle();
        boardModel.getPlayer2DrawDeck().shuffle();

        return boardModel;
    }

    getCardData()
    {
        let cardData = [{
            cost: 100,
            health: 4, 
            attack: 0,
            ability: "",
            rank: 1,
            politicalIssue: "Economy",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 1, 
            attack: 6,
            ability: "",
            rank: 2,
            politicalIssue: "Economy",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 3,
            ability: "",
            rank: 1,
            politicalIssue: "Economy",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 5, 
            attack: 3,
            ability: "",
            rank: 2,
            politicalIssue: "Economy",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 3,
            ability: "",
            rank: 1,
            politicalIssue: "Healthcare",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 4,
            ability: "",
            rank: 2,
            politicalIssue: "Healthcare",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 5, 
            attack: 0,
            ability: "",
            rank: 1,
            politicalIssue: "Healthcare",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 5,
            ability: "",
            rank: 2,
            politicalIssue: "Healthcare",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 1,
            ability: "",
            rank: 1,
            politicalIssue: "Education",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 4, 
            attack: 2,
            ability: "",
            rank: 2,
            politicalIssue: "Education",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: 1,
            politicalIssue: "Education",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 2,
            ability: "",
            rank: 2,
            politicalIssue: "Education",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: 1,
            politicalIssue: "Taxes",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 2, 
            attack: 7,
            ability: "",
            rank: 2,
            politicalIssue: "Taxes",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: 1,
            politicalIssue: "Taxes",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 5,
            ability: "",
            rank: 2,
            politicalIssue: "Taxes",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 1,
            ability: "",
            rank: 1,
            politicalIssue: "Environment",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 4, 
            attack: 2,
            ability: "",
            rank: 2,
            politicalIssue: "Environment",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 3, 
            attack: 1,
            ability: "",
            rank: 1,
            politicalIssue: "Environment",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 5, 
            attack: 2,
            ability: "",
            rank: 2,
            politicalIssue: "Environment",
            politicalView: "Conservative",
            isWorker: false
        },
        ]
        return cardData;
    }
}