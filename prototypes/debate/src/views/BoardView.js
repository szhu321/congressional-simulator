import BoardModel from '../models/BoardModel'
import Phaser from "phaser";
import Zone from '../helpers/zone';
import CardView from './CardView';
import DeckView from './DeckView';
import BoardController from '../controllers/BoardController';

export default class BoardView extends Phaser.GameObjects.Layer{

    /**
     * @type {BoardController}
     */
    controller

    constructor(scene){
        super(scene);
        this.fontSize = 15;
        this.abilityFontSize = 12;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 2;
        this.cardColor = 0xf7e9c3;
        this.playerCards = [];
        this.opponentCards = [];
        this.playerBattleFunds = 450;
        this.opponentBattleFunds = 450;
        this.playerVotes = 10;
        this.opponentVotes = 10;
        this.playerDeckSize = 20;
        this.opponentDeckSize = 20;
        this.controller = null;
    }

    /**
     * 
     * @param {BoardModel} model 
     */
    initialize(model){
        let dealText = this.scene.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        // let playerDeckZone = this.createDeck(20, true);
        
        let zone = new Zone(this.scene);
        let playerDropZone = zone.renderZone(700, 460).setName("playerZone");
        this.scene.input.setTopOnly(false);
        /* let playerOutline = */zone.renderOutline(playerDropZone);
        let opponentDropZone = zone.renderZone(700, 260).setName("opponentZone");
        /* let opponentOutline = */zone.renderOutline(opponentDropZone);

        let opponentVoteZone = this.scene.add.zone(1300, 80, 100, 100).setRectangleDropZone(100, 100).setName("opponentVotes");
        /* let opponentVoteOutline = */zone.renderOutline(opponentVoteZone);

        let playerBattleFundsText = this.scene.add.text(125, 550, [`Current Funds: $${this.playerBattleFunds}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let playerVotesText = this.scene.add.text(125, 650, [`${this.playerVotes} Votes`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let opponentBattleFundsText = this.scene.add.text(1300, 170, [`Current Funds: $${this.opponentBattleFunds}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let opponentVotesText = this.scene.add.text(1300, 80, [`${this.opponentVotes} Votes`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);

        let currentTurnText = this.scene.add.text(1300, 350, ['player1\'s Turn']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0);
        let endTurnText = this.scene.add.text(1300, 450, ['END TURN']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive().setOrigin(0.5, 0);

        //ADD THE DECK AND HAND VIEW ZONES. -------------------------------------
        let playerDeckZone = model.getPlayer1DrawDeck().getView();
        console.log(playerDeckZone);
        this.scene.add.existing(playerDeckZone);
        // playerDeckZone.updateDisplay("");
        // playerDeckZone.setInteractive();
        playerDeckZone.setPosition(1300, 640);

        // let opponentDeckZone = this.createDeck(20, false);
        let opponentDeckZone = model.getPlayer2DrawDeck().getView();
        this.scene.add.existing(opponentDeckZone);
        opponentDeckZone.setPosition(120, 80).setRotation(Math.PI);

        let playerHandZone = model.getPlayer1Hand().getView();
        this.scene.add.existing(playerHandZone);
        playerHandZone.setPosition(this.scene.game.canvas.width / 4, this.scene.game.canvas.height - 80);

        let playerBoardZone = model.getPlayer1Board().getView();
        this.scene.add.existing(playerBoardZone);
        playerBoardZone.setPosition(this.scene.game.canvas.width / 4, this.scene.game.canvas.height - 240);

        let opponentHandZone = model.getPlayer2Hand().getView();
        this.scene.add.existing(opponentHandZone);
        opponentHandZone.setPosition(this.scene.game.canvas.width / 4, 80);

        let opponentBoardZone = model.getPlayer2Board().getView();
        this.scene.add.existing(opponentBoardZone);
        opponentBoardZone.setPosition(this.scene.game.canvas.width / 4, 240);

        playerDeckZone.on('pointerdown', () => {
            // console.log("Draw 1 card");
            // console.log(this);
            // let playerCard = this.createCard(true);
            // this.playerCards.push(playerCard);
            // this.repositionCards(this.playerCards, 400, 640, 1);
            this.controller.drawCardPlayer1();
        })

        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            //console.log(`Dragging: ${dragX}, ${dragY}`);
        })

        this.scene.input.on('dragstart', (pointer, gameObject) => {
            this.scene.children.bringToTop(gameObject);
            console.log(`DRAG STARTTTT`);
        })

        this.scene.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if(gameObject.data.values.dropZoneName === dropZone.name){
                gameObject.x = gameObject.data.values.dropZoneX;
                gameObject.y = gameObject.data.values.dropZoneY;
            }else if(dropZone.name === 'opponentVotes' && gameObject.data.values.dropZoneName === 'playerZone'){
                // if(this.opponentVotes > 0){
                //     this.opponentVotes--;
                //     this.playerVotes++;
                //     this.getChildren()[6].setText([`${this.playerVotes} Votes`]);
                //     this.getChildren()[8].setText([`${this.opponentVotes} Votes`]);
                // }
                // gameObject.x = gameObject.data.values.dropZoneX;
                // gameObject.y = gameObject.data.values.dropZoneY;
                // gameObject.disableInteractive();
                // gameObject.getAt(0).setFillStyle(0x9d7915)
                this.controller.attackPlayer2(model.getPlayer1Board().getCards().map(card => card.view).indexOf(gameObject));
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }else{
                console.log("Drop detected");
                console.log(this.playerBattleFunds);
                if(dropZone.name === 'playerZone'){
                    // console.log("Place card");
                    // this.playerBattleFunds -= gameObject.data.values.cost;
                    // this.getChildren()[5].setText([`Current Funds: $${this.playerBattleFunds}`]);
                    // dropZone.data.values.cards++;
                    // dropZone.data.values.cardList.push(gameObject);
                    // console.log(this.playerCards.indexOf(gameObject));
                    // this.playerCards.splice(this.playerCards.indexOf(gameObject), 1);
                    // this.repositionCards(dropZone.data.values.cardList, dropZone.x - 350, dropZone.y, 1);
                    // this.repositionCards(this.playerCards, 400, 640, 1);
                    
                    let cards = model.getPlayer1Hand().getCards();
                    let idx = -1;
                    for(let i = 0; i < cards.length; i++)
                    {
                        if(cards[i].view === gameObject)
                        {
                            idx = i;
                            break;
                        }
                    }

                    let played = false;
                    if(idx !== -1)
                    {
                        played = this.controller.playCardPlayer1(idx);
                    }

                    
                    if(!played){
                        gameObject.x = gameObject.input.dragStartX;
                        gameObject.y = gameObject.input.dragStartY;
                    }

                    // gameObject.data.values.dropZoneName = dropZone.name;
                    // gameObject.data.values.dropZoneX = gameObject.x;
                    // gameObject.data.values.dropZoneY = gameObject.y;
                    console.log(model)
                    
                }else{
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            }
        })

        endTurnText.on('pointerdown', () => {
            // this.getChildren()[9].setText(['player2\'s Turn']);
            this.controller.nextTurn();
        })

        endTurnText.on('pointerover', () => {
            this.getChildren()[10].setColor('#ff69b4');
        })

        endTurnText.on('pointerout', () => {
            this.getChildren()[10].setColor('#00ffff');
        })

        dealText.on('pointerdown', () => {
            //this.dealCards();
        })

        dealText.on('pointerover', () => {
            this.getChildren()[11].setColor('#ff69b4');
        })

        dealText.on('pointerout', () => {
            this.getChildren()[11].setColor('#00ffff');
        })

        // for (let i = 0; i < 5; i++) {
        //     let playerCard = this.createCard(true);
        //     let opponentCard = this.createCard(true);
        //     opponentCard.disableInteractive();
        //     opponentCard.setRotation(Math.PI);
        //     console.log('hello');
        //     this.playerCards.push(playerCard);
        //     this.opponentCards.push(opponentCard);
        // }
        // this.repositionCards(this.playerCards, 400, 640, 1);
        // this.repositionCards(this.opponentCards, 1000, 80, -1);

        this.add(playerDeckZone);
        this.add(opponentDeckZone);
        this.add(playerDropZone);
        this.add(opponentDropZone);
        this.add(opponentVoteZone);

        this.add(playerBattleFundsText);
        this.add(playerVotesText);
        this.add(opponentBattleFundsText);
        this.add(opponentVotesText);
        this.add(currentTurnText);
        this.add(endTurnText);
        this.add(dealText);
    }

    // createCard(frontFacing, deckSize){
    //     let card = new CardView(this.scene);
    //     card.initialize();
    //     this.scene.add.existing(card);
    //     if(frontFacing){
    //         card.updateDisplay(["\u{2605}", "$100", "Environment Liberal", "When played deal 1 damage to a random opponent card", "1", "1"], frontFacing);
    //     }else{
    //         card.updateDisplay(["" + deckSize], frontFacing);
    //     }
    //     card.setInteractive(new Phaser.Geom.Rectangle(-1 * card.maxWidth / 2, -1 * card.maxHeight / 2, card.maxWidth, card.maxHeight), Phaser.Geom.Rectangle.Contains);
    //     this.scene.input.setDraggable(card);
    //     return card;
    //     // this.input.enableDebug(this.card);
    // }

    // createDeck(deckSize, interactive){
    //     let deck = new DeckView(this.scene);
    //     deck.initialize();
    //     this.scene.add.existing(deck);
    //     deck.updateDisplay(deckSize);
    //     if(interactive)
    //         deck.setInteractive(new Phaser.Geom.Rectangle(-1 * deck.maxWidth / 2, -1 * deck.maxHeight / 2, deck.maxWidth, deck.maxHeight), Phaser.Geom.Rectangle.Contains);
    //     return deck;
    // }

    // repositionCards = (dropZoneCards, x, y, sign) => {
    //     for(let i = 0; i < dropZoneCards.length; i++){
    //         dropZoneCards[i].x = x + sign * 150 * i;
    //         dropZoneCards[i].y = y;
    //     }
    // }

    // dealCards = () => {
    //     for (let i = 0; i < 5; i++) {
    //         let playerCard = this.createCard(true);
    //         let opponentCard = this.createCard(true);
    //         opponentCard.disableInteractive();
    //         opponentCard.setRotation(Math.PI);
    //         console.log('hello');
    //         this.playerCards.push(playerCard);
    //         this.opponentCards.push(opponentCard);
    //     }
    //     this.repositionCards(this.playerCards, 400, 640, 1);
    //     this.repositionCards(this.opponentCards, 1000, 80, -1);
    // }

    /**
     * Update board display based on model information
     * @param {BoardModel} model 
     */
    updateViewCallback(model){
        // Player Hand
        // for(let card of this.playerCards){
        //     this.remove(card);
        // }
        // this.playerCards.splice(0, this.playerCards.length);
        // for(let card of model.getPlayer1Hand().getCards()){
        //     this.playerCards.push(card.view);
        //     this.add(card.view);
        // }
        //this.repositionCards(this.playerCards, 400, 640, 1);
        // Opponent Hand
        // for(let card of this.opponentCards){
        //     this.remove(card);
        // }
        // this.opponentCards.splice(0, this.opponentCards.length);
        // for(let card of model.getPlayer2Hand().getCards()){
        //     this.opponentCards.push(card.view);
        //     this.add(card.view);
        // }
        //this.repositionCards(this.opponentCards, 1000, 80, -1);
        // Player Deck
        // this.getChildren()[0].updateViewCallback(model.getPlayer1DrawDeck());
        // // Opponent Deck
        // this.getChildren()[1].updateViewCallback(model.getPlayer2DrawDeck());
        // Player Board
        // for(let card of this.getChildren()[2].data.values.cardList){
        //     this.remove(card);
        // }
        // this.getChildren()[2].data.values.cardList.splice(0, this.getChildren()[2].data.values.cardList.length);
        // for(let card of model.getPlayer2Hand().getCards()){
        //     this.getChildren()[2].data.values.cardList.push(card.view);
        //     this.add(card.view);
        // }
        //this.repositionCards(this.getChildren()[2].data.values.cardList, this.getChildren()[2].x - 350, this.getChildren()[2].y, 1);
        // Opponent Board
        // for(let card of this.getChildren()[3].data.values.cardList){
        //     this.remove(card);
        // }
        // this.getChildren()[3].data.values.cardList.splice(0, this.getChildren()[3].data.values.cardList.length);
        // for(let card of model.getPlayer2Hand().getCards()){
        //     this.getChildren()[3].data.values.cardList.push(card.view);
        //     this.add(card.view);
        // }
        //this.repositionCards(this.getChildren()[3].data.values.cardList, this.getChildren()[3].x - 350, this.getChildren()[3].y, 1);
        // Player Money Text
        this.getChildren()[5].setText([`Current Funds: $${model.getPlayer1Money()}`]);
        // Opponent Money Text
        this.getChildren()[7].setText([`Current Funds: $${model.getPlayer2Money()}`]);
        // Player Votes Text
        this.getChildren()[6].setText([`${model.getPlayer1Votes()} Votes`]);
        // Opponent Votes Text
        this.getChildren()[8].setText([`${model.getPlayer2Votes()} Votes`]);
        // Current Turn Text
        this.getChildren()[9].setText(`${model.getTurn()}'s Turn`);
    }
}