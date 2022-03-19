import Phaser from 'phaser';
import DebateScene from './debate/scenes/DebateScene.js';
import CampaignScene from './campaign/scenes/CampaignScene.js';
import ClickerScene from './clicker/scenes/ClickerScene.js';
import MenuScene from './scenes/MenuScene.js';


var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

var game = new Phaser.Game(config);

game.scene.add('debateScene', DebateScene);
game.scene.add('campaignScene', CampaignScene);
game.scene.add('clickerScene', ClickerScene);
game.scene.add('menuScene', MenuScene)
game.scene.start('menuScene');
