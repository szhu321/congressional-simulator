import Card from '../helpers/card';
import Zone from '../helpers/zone';

export default class MyGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    init() {
        this.data.set({battleFunds: 450, playerVotes: 10, opponentVotes: 10});
    }

    preload() {
        this.load.image('issueCard', 'assets/issue_card.png');
        this.load.image('workerCard', 'assets/worker_card.png');
        // this.load.setBaseURL('http://labs.phaser.io');

        // this.load.image('sky', 'assets/skies/space3.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        let self = this;

        this.battleFundsText = this.add.text(50, 550, ['Current Funds: $' + this.data.values.battleFunds]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.playerVotesText = this.add.text(100, 650, [this.data.values.playerVotes + ' Votes']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.opponentVotesText = this.add.text(100, 150, [this.data.values.opponentVotes + ' Votes']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');

		// this.card = this.add.image(300, 300, 'issueCard').setScale(0.5, 0.5).setInteractive();
        // this.input.setDraggable(this.card);
        this.playerCards = [];
        console.log('hello2')
		this.dealCards = () => {
            console.log(this);
        	for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                console.log('hello')
                this.playerCards.push(playerCard.render(475 + (i * 100), 650, 'issueCard'));
            }
            this.repositionCards(this.playerCards, 475, 650);
            // for(let i = 0; i < this.playerCards.length; i++){
            //     this.playerCards[i].x = 475 + (i * 100);
            //     this.playerCards[i].y = 650;
            // }
    	}

        let playerDeck = new Card(this);
        this.playerDeckZone = playerDeck.render(1200, 650, 'issueCard');
        console.log(this.playerDeckZone);
        this.input.setDraggable(this.playerDeckZone, false);
        
        this.playerDeckZone.on('pointerdown', function () {
            console.log("Draw 1 card");
            console.log(self);
            let playerCard = new Card(self);
            self.playerCards.push(playerCard.render(0, 0, 'issueCard'));
            self.repositionCards(self.playerCards, 475, 650);
            // for(let i = 0; i < self.playerCards.length; i++){
            //     self.playerCards[i].x = 475 + (i * 100);
            //     self.playerCards[i].y = 650;
            // }
        })

		this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // console.log(typeof gameObject);
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            // if(gameObject.data.values.dropZoneName === dropZone.name){
            //     gameObject.x = gameObject.data.values.dropZoneX;
            //     gameObject.y = gameObject.data.values.dropZoneY;
            // }else{
            //     dropZone.data.values.cards++;
            //     dropZone.data.values.cardList.push(gameObject);
            //     gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 100);
            //     gameObject.y = dropZone.y;
            //     gameObject.data.values.dropZoneName = dropZone.name;
            //     gameObject.data.values.dropZoneX = gameObject.x;
            //     gameObject.data.values.dropZoneY = gameObject.y;
            // }
            if(gameObject.data.values.dropZoneName === dropZone.name){
                gameObject.x = gameObject.data.values.dropZoneX;
                gameObject.y = gameObject.data.values.dropZoneY;
            }else if(dropZone.name === 'opponentVotes' && gameObject.data.values.dropZoneName === 'playerZone'){
                if(self.data.values.opponentVotes > 0){
                    self.data.values.opponentVotes--;
                    self.data.values.playerVotes++;
                    self.playerVotesText.setText([self.data.values.playerVotes + ' Votes']);
                    self.opponentVotesText.setText([self.data.values.opponentVotes + ' Votes']);
                }
                gameObject.x = gameObject.data.values.dropZoneX;
                gameObject.y = gameObject.data.values.dropZoneY;
            }else{
                console.log("Drop detected");
                console.log(self.data.values.battleFunds);
                if(gameObject.data.values.cost <= self.data.values.battleFunds && dropZone.name === 'playerZone'){
                    console.log("Place card");
                    self.data.values.battleFunds -= gameObject.data.values.cost;
                    self.battleFundsText.setText(['Current Funds: $' + self.data.values.battleFunds]);
                    dropZone.data.values.cards++;
                    dropZone.data.values.cardList.push(gameObject);
                    console.log(self.playerCards.indexOf(gameObject));
                    self.playerCards.splice(self.playerCards.indexOf(gameObject), 1);
                    // gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 100);
                    // gameObject.y = dropZone.y;
                    // for(let i = 0; i < dropZone.data.values.cardList.length; i++){
                    //     dropZone.data.values.cardList[i].x = dropZone.x - 350 + 100 * i;
                    //     dropZone.data.values.cardList[i].y = dropZone.y;
                    // }
                    self.repositionCards(dropZone.data.values.cardList, dropZone.x - 350, dropZone.y);
                    self.repositionCards(self.playerCards, 475, 650);
                    gameObject.data.values.dropZoneName = dropZone.name;
                    gameObject.data.values.dropZoneX = gameObject.x;
                    gameObject.data.values.dropZoneY = gameObject.y;
                }else{
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            }
            // gameObject.disableInteractive();
        })
        console.log("start");

        this.zone = new Zone(this);
        this.playerDropZone = this.zone.renderZone(700, 475).setName("playerZone");
        this.playerOutline = this.zone.renderOutline(this.playerDropZone);
        this.opponentDropZone = this.zone.renderZone(700, 175).setName("opponentZone");
        this.opponentOutline = this.zone.renderOutline(this.opponentDropZone);

        this.opponentVoteZone = this.add.zone(125, 175, 100, 100).setRectangleDropZone(100, 100).setName("opponentVotes");
        this.opponentVoteOutline = this.zone.renderOutline(this.opponentVoteZone);
        // this.add.image(400, 300, 'sky');

        // var particles = this.add.particles('red');

        // var emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD'
        // });

        // var logo = this.physics.add.image(400, 100, 'logo');

        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);

        // emitter.startFollow(logo);

        this.repositionCards = (dropZoneCards, x, y) => {
            for(let i = 0; i < dropZoneCards.length; i++){
                dropZoneCards[i].x = x + 100 * i;
                dropZoneCards[i].y = y;
            }
        }
    }
    
    update() {
    
    }
}