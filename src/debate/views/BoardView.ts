import BoardModel from '../models/BoardModel'
import Phaser from "phaser";
import Zone from '../helpers/zone';
import CardView from './CardView';
import DeckView from './DeckView';
import BoardController from '../controllers/BoardController';
import { SCENE_CONFIG } from '../../gameconfig';

export default class BoardView extends Phaser.GameObjects.Layer{
    private controller: BoardController;
    private selectedCard: CardView;
    private targetCard: CardView;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.controller = null;
        this.selectedCard = null;
        this.targetCard = null;
    }

    setController(controller: BoardController){
        this.controller = controller;
    }

    initialize(model: BoardModel){
        let zone = new Zone(this.scene);
        let playerDropZone = zone.renderZone(700, 460).setName("playerZone");
        this.scene.input.setTopOnly(false);
        zone.renderOutline(playerDropZone);
        let opponentDropZone = zone.renderZone(700, 260).setName("opponentZone");
        zone.renderOutline(opponentDropZone);

        let opponentVoteZone = this.scene.add.zone(1300, 80, 100, 100).setRectangleDropZone(100, 100).setName("opponentVotes");
        zone.renderOutline(opponentVoteZone);

        let playerBattleFundsText = this.scene.add.text(125, 550, [`Current Funds: $${model.getPlayer1Money()}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let playerVotesText = this.scene.add.text(125, 650, [`${model.getPlayer1Votes()} Votes`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let opponentBattleFundsText = this.scene.add.text(1300, 170, [`Current Funds: $${model.getPlayer2Money()}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);
        let opponentVotesText = this.scene.add.text(1300, 80, [`${model.getPlayer2Votes()} Votes`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5);

        let currentTurnText = this.scene.add.text(1300, 350, ['player1\'s Turn']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0);
        let endTurnText = this.scene.add.text(1300, 450, ['END TURN']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({useHandCursor: true}).setOrigin(0.5, 0);

        //ADD THE DECK AND HAND VIEW ZONES. -------------------------------------
        let playerDeckZone = model.getPlayer1DrawDeck().getView();
        console.log(playerDeckZone);
        this.scene.add.existing(playerDeckZone);
        playerDeckZone.setPosition(1300, SCENE_CONFIG.scene_height - 100);

        let opponentDeckZone = model.getPlayer2DrawDeck().getView();
        this.scene.add.existing(opponentDeckZone);
        opponentDeckZone.setPosition(120, 80).setRotation(Math.PI);

        let playerHandZone = model.getPlayer1Hand().getView();
        this.scene.add.existing(playerHandZone);
        playerHandZone.setPosition(this.scene.game.canvas.width / 4, SCENE_CONFIG.scene_height - 85);

        let playerBoardZone = model.getPlayer1Board().getView();
        this.scene.add.existing(playerBoardZone);
        playerBoardZone.setPosition(this.scene.game.canvas.width / 4, SCENE_CONFIG.scene_height - 270);

        let opponentHandZone = model.getPlayer2Hand().getView();
        this.scene.add.existing(opponentHandZone);
        opponentHandZone.setPosition(this.scene.game.canvas.width / 4, 80);

        let opponentBoardZone = model.getPlayer2Board().getView();
        this.scene.add.existing(opponentBoardZone);
        opponentBoardZone.setPosition(this.scene.game.canvas.width / 4, 240);

        playerDeckZone.on('pointerdown', () => {
            this.controller.drawCardPlayer1();
        })

        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.scene.input.on('dragstart', (pointer, gameObject) => {
            this.scene.children.bringToTop(gameObject);
            this.selectedCard = gameObject;
            console.log(`DRAG STARTTTT`);
        })

        this.scene.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            this.selectedCard = null;
        })

        this.scene.input.on('gameobjectover', (pointer, gameObject, event) => {
            if(gameObject instanceof CardView){
                console.log(gameObject)
                if(this.selectedCard !== null){
                    this.targetCard = gameObject;
                }
            }
        })

        this.scene.input.on('gameobjectout', (pointer, gameObject, event) => {
            if(gameObject instanceof CardView){
                console.log(gameObject)
                if(this.selectedCard !== null){
                    this.targetCard = null;
                }
            }
        })

        this.scene.input.on('drop', (pointer, gameObject, dropZone) => {
            console.log(dropZone);
            console.log(gameObject === dropZone);
            if(gameObject.data.values.dropZoneName === dropZone.name && dropZone.name !== ""){
                gameObject.x = gameObject.data.values.dropZoneX;
                gameObject.y = gameObject.data.values.dropZoneY;
            }else if(dropZone.name === 'opponentVotes' && gameObject.data.values.dropZoneName === 'playerZone'){
                this.controller.attackPlayer2(model.getPlayer1Board().getCards().map(card => card.getView()).indexOf(gameObject));
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                gameObject.disableInteractive();
            }else if(dropZone.name === 'opponentZone' && gameObject.data.values.dropZoneName === 'playerZone'){
                if(this.targetCard !== null){
                    let playerIndex = model.getPlayer1Board().getCards().map(card => card.getView()).indexOf(gameObject);
                    let opponentIndex = model.getPlayer2Board().getCards().map(card => card.getView()).indexOf(this.targetCard);
                    this.controller.attackPlayer2Card(playerIndex, opponentIndex);
                    gameObject.disableInteractive();
                }
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }else{
                if(dropZone.name === 'playerZone'){
                    
                    let cards = model.getPlayer1Hand().getCards();
                    let idx = -1;
                    for(let i = 0; i < cards.length; i++)
                    {
                        if(cards[i].getView() === gameObject)
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

                    gameObject.data.values.dropZoneName = dropZone.name;
                    gameObject.data.values.dropZoneX = gameObject.x;
                    gameObject.data.values.dropZoneY = gameObject.y;
                    console.log(model)
                    
                }else{
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            }
        })

        endTurnText.on('pointerdown', () => {
            this.controller.nextTurn();
        })

        endTurnText.on('pointerover', () => {
            endTurnText.setColor('#ff69b4');
        })

        endTurnText.on('pointerout', () => {
            endTurnText.setColor('#00ffff');
        })

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
    }

    /**
     * Update board display based on model information
     * @param {BoardModel} model 
     */
    updateViewCallback(model: BoardModel){
        // Player Money Text
        let playerMoneyText = this.getChildren()[5] as Phaser.GameObjects.Text;
        playerMoneyText.setText([`Current Funds: $${model.getPlayer1Money()}`]);
        // Opponent Money Text
        let opponentMoneyText = this.getChildren()[7] as Phaser.GameObjects.Text;
        opponentMoneyText.setText([`Current Funds: $${model.getPlayer2Money()}`]);
        // Player Votes Text
        let playerVotesText = this.getChildren()[6] as Phaser.GameObjects.Text;
        playerVotesText.setText([`${model.getPlayer1Votes()} Votes`]);
        // Opponent Votes Text
        let opponentVotesText = this.getChildren()[8] as Phaser.GameObjects.Text;
        opponentVotesText.setText([`${model.getPlayer2Votes()} Votes`]);
        // Current Turn Text
        let currentTurnText = this.getChildren()[8] as Phaser.GameObjects.Text;
        currentTurnText.setText(`${model.getTurn()}'s Turn`);
    }
}