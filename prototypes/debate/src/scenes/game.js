import Card from '../helpers/card';
import Zone from '../helpers/zone';
import CardView from '../views/CardView';
import Phaser from 'phaser';
import BoardView from '../views/BoardView';

export default class MyGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.board;
    }

    init() {
        this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
    }

    preload() {
        // this.load.image('issueCard', 'assets/issue_card.png');
        // this.load.image('workerCard', 'assets/worker_card.png');
    }

    create() {
        this.board = new BoardView(this);
        this.board.initialize();
        this.add.existing(this.board);
    }

    update() {
    
    }
}