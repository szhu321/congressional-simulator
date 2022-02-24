import Card from '../helpers/card';
import Zone from '../helpers/zone';

export default class MyGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('issueCard', '../assets/issue_card.png');
        this.load.image('workerCard', '../assets/worker_card.png');
        // this.load.setBaseURL('http://labs.phaser.io');

        // this.load.image('sky', 'assets/skies/space3.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        let self = this;

		// this.card = this.add.image(300, 300, 'issueCard').setScale(0.5, 0.5).setInteractive();
        // this.input.setDraggable(this.card);

		this.dealCards = () => {
        	for (let i = 0; i < 5; i++) {
                let playerCard = new Card(this);
                playerCard.render(475 + (i * 100), 650, 'issueCard');
            }
    	}

		this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
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
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
        })
        console.log("start");

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);
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
    }
    
    update() {
    
    }
}