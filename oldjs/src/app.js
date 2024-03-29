import Phaser from 'phaser';
import DebateScene from './debate/scenes/DebateScene.js';
import CampaignScene from './campaign/scenes/CampaignScene.js';
import ClickerScene from './clicker/scenes/ClickerScene.js';
import MenuScene from './scenes/MenuScene.js';
import HubScene from './scenes/HubScene.js';
import { GAME_CONFIG } from './gameconfig.js';


var config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.game_width,
    height: GAME_CONFIG.game_height,
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
game.scene.add('hubScene', HubScene);
game.scene.add('menuScene', MenuScene);

//At any point in the game, the menubar scene will always be displayed.
//The menubar will have links to the hub area, fundraising area, campaign area, debate area.
//Out of all the areas, the hub area and fundraising area will always be availiable.
//Once the user moves far enough into the game the campaign area will become always avaliable.
//The debate area will be created and destroyed as needed.

game.scene.start('menuScene');
game.scene.start('hubScene');
