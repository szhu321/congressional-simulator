import CardView from '../views/CardView';
import 'phaser';
import BoardView from '../views/BoardView';
import BoardController from '../controllers/BoardController';
import BoardModel from '../models/BoardModel';
import CardModel from '../models/CardModel';
import DeckModel from '../models/DeckModel';
import DeckView from '../views/DeckView';
import HandView from '../views/HandView';
import { SCENE_CONFIG } from '../../gameconfig';
import { TURN } from '../models/BoardModel';
import { CARD_RANK } from '../../gameenums';

export default class DebateScene extends Phaser.Scene {
    private boardModel: BoardModel;
    private boardView: BoardView;
    private boardController: BoardController;

    preload() {
        this.load.image('sword', 'assets/sword.png');
        this.load.image('shield', 'assets/shield.png');
    }

    create() {
        this.initializeBackground();
        this.initializeCamera();

        this.boardModel = this.createBoard();
        this.boardController = new BoardController(this.boardModel);
        this.boardView = new BoardView(this);
        this.boardModel.setView(this.boardView);
        this.boardView.setController(this.boardController);
        this.boardView.initialize(this.boardModel);
        this.boardModel.updateView();
        this.add.existing(this.boardView);
    }

    initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }

    createDeck(){
        let deckModel = new DeckModel();
        let deckView = new DeckView(this);
        deckView.initialize();
        deckModel.setView(deckView);
        deckView.updateDisplay();
        deckView.setInteractive(new Phaser.Geom.Rectangle(-1 * deckView.getMaxWidth() / 2, 
            -1 * deckView.getMaxHeight() / 2, deckView.getMaxWidth(), deckView.getMaxHeight()), Phaser.Geom.Rectangle.Contains);
        deckModel.updateView();
        return deckModel;
    }

    createHand(){
        let deckModel = new DeckModel();
        let deckView = new HandView(this);
        deckModel.setView(deckView);
        deckModel.updateView();
        return deckModel;
    }

    createNewCard(jsonObject: {cost: number, health: number, attack: number, ability: string, name?: string, politicalIssue: string,
        politicalView: string, description?: string, rank: CARD_RANK, view?: CardView, actionCount?: number, stars?: number,
        isAttacking?: boolean, isWorker: boolean})
    {
        let cardModel = new CardModel();
        let cardView = new CardView(this);
        cardView.initialize();
        cardView.updateDisplay(["\u{2605}", "$100", "Environment Liberal", "When played deal 1 damage to a random opponent card", "1", "1"], true);
        cardView.setInteractive(new Phaser.Geom.Rectangle(-1 * cardView.getMaxWidth() / 2, -1 * cardView.getMaxHeight() / 2, 
            cardView.getMaxWidth(), cardView.getMaxHeight()), Phaser.Geom.Rectangle.Contains);
        this.input.setDraggable(cardView);
        cardModel.setView(cardView);
        cardModel.setConfig(jsonObject);
        cardModel.updateView();
        return cardModel;
    }

    createBoard()
    {
        let boardModel = new BoardModel();

        //The draw deck and the discard deck.
        boardModel.setPlayer1DrawDeck(this.createDeck());
        boardModel.setPlayer1DiscardDeck(this.createDeck());
        boardModel.setPlayer2DrawDeck(this.createDeck());
        boardModel.setPlayer2DiscardDeck(this.createDeck());

        //The cards on the hand is what the player's can play each round.
        boardModel.setPlayer1Hand(this.createHand());
        boardModel.setPlayer2Hand(this.createHand());

        //The cards on the board is the cards the player have on action.
        boardModel.setPlayer1Board(this.createHand());
        boardModel.setPlayer2Board(this.createHand());
        
        boardModel.setPlayer1Money(300);
        boardModel.setPlayer2Money(300);
        
        boardModel.setPlayer1Votes(10);
        boardModel.setPlayer2Votes(10);

        boardModel.setTurn(TURN.PLAYER1);

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
            this.input.setDraggable(card.getView(), false);
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
            rank: CARD_RANK.COMMON,
            politicalIssue: "Economy",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 1, 
            attack: 6,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Economy",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 3,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Economy",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 5, 
            attack: 3,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Economy",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 3,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Healthcare",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 4,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Healthcare",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 5, 
            attack: 0,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Healthcare",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 5,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Healthcare",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 1,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Education",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 4, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Education",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Education",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Education",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Taxes",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 2, 
            attack: 7,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Taxes",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 1, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Taxes",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 3, 
            attack: 5,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Taxes",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 100,
            health: 2, 
            attack: 1,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Environment",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 200,
            health: 4, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Environment",
            politicalView: "Liberal",
            isWorker: false
        },
        {
            cost: 100,
            health: 3, 
            attack: 1,
            ability: "",
            rank: CARD_RANK.COMMON,
            politicalIssue: "Environment",
            politicalView: "Conservative",
            isWorker: false
        },
        {
            cost: 200,
            health: 5, 
            attack: 2,
            ability: "",
            rank: CARD_RANK.RARE,
            politicalIssue: "Environment",
            politicalView: "Conservative",
            isWorker: false
        },
        ]
        return cardData;
    }
}