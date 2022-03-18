import Phaser from 'phaser';
import ClickerScene from './scenes/ClickerScene';

var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    // scene: [
        // preload: preload,
        // create: create
        //MyGame
    // ]
};

let game = new Phaser.Game(config);

game.scene.add('clickerScene', ClickerScene);
game.scene.start('clickerScene');