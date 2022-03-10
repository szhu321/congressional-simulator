import Phaser from 'phaser';
import BoardController from '../controllers/BoardController';
import CardController from '../controllers/CardController';
import BoardModel from '../models/BoardModel';
import CardModel from '../models/CardModel';
import CardView from '../views/CardView';

export default class Test extends Phaser.Scene {
    constructor() {
        super({
            key: 'Test'
        });
    }
    
    init()
    {

    }

    preload() 
    {
        this.load.image('issueCard', 'assets/issue_card.png');
        this.load.image('workerCard', 'assets/worker_card.png');
    }

    create()
    {
        let boardModel = this.createBoard();
        let boardController = new BoardController(boardModel);
        //draw 5 cards for player 1.
        boardController.drawCardPlayer1();
        boardController.drawCardPlayer1();
        boardController.drawCardPlayer1();
        boardController.drawCardPlayer1();
        boardController.drawCardPlayer1();

        


        //player 1 plays a card
        boardController.playCardPlayer1(0);

        //player 1 attacks player 2, fails becuase you cannot attack when the card is placed.
        boardController.attackPlayer2(0);

        //player 1 end turn.
        boardController.nextTurn();

        //player 2 draw cards.
        boardController.drawCardPlayer2();
        boardController.drawCardPlayer2();
        boardController.drawCardPlayer2();
        boardController.drawCardPlayer2();
        boardController.drawCardPlayer2();

        //player 2 play card
        boardController.playCardPlayer2(2);
        boardController.playCardPlayer2(0);
        boardController.playCardPlayer2(0);
        boardController.playCardPlayer2(0);
        
        //player 2 end turn.
        boardController.nextTurn();

        //player 1 attack player 2. NOTE: check for active worker cards.
        boardController.attackPlayer2(0);
        boardController.attackPlayer2(0);

        //player 1 end turn
        boardController.nextTurn();

        //player 2 attack player 1 card.
        boardController.attackPlayer1Card(0, 0);

        console.log(boardModel);
    }

    createBoard()
    {
        let boardModel = new BoardModel();
        boardModel.setPlayer1Money(500);
        boardModel.setPlayer2Money(500);
        
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
        for(let card of cards)
        {
            cards2.push(card.clone());
        }

        boardModel.getPlayer1DrawDeck().addAllCards(cards);
        boardModel.getPlayer2DrawDeck().addAllCards(cards);
        boardModel.getPlayer1DrawDeck().shuffle();
        boardModel.getPlayer2DrawDeck().shuffle();

        return boardModel;
    }

    createNewCard(jsonObject)
    {
        let cardModel = new CardModel();
        cardModel.setConfig(jsonObject);
        return cardModel;
        //model has been created.

        //we need the controller and the view.
        // let cardController = new CardController(cardModel);
        // let cardView = new CardView(this);
        // cardModel.setUpdateViewCallback(cardView.updateViewCallBack);
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