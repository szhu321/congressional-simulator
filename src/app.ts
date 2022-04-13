import 'phaser';
import DebateScene from './debate/scenes/DebateScene';
import CampaignScene from './campaign/scenes/CampaignScene';
import FundraiseScene from './fundraise/scenes/FundraiseScene';
import MenuScene from './scenes/MenuScene';
import HomeScene from './scenes/HomeScene';
import InstructScene from './scenes/InstructScene';
import BackStoryScene from './scenes/BackStoryScene';
import GameOverScene from './scenes/GameOverScene';
//import { GAME_CONFIG } from './gameconfig.js';
import { GAME_CONFIG } from './gameconfig';
import PlatformScene from './platform/scenes/PlatformScene';

var config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.game_width,
    height: GAME_CONFIG.game_height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    // scale: {
    //     mode: Phaser.Scale.RESIZE,
    //     zoom: 0.8,
    // }
};

var game = new Phaser.Game(config);

game.scene.add('debateScene', DebateScene);
game.scene.add('campaignScene', CampaignScene);
game.scene.add('fundraiseScene', FundraiseScene);
game.scene.add('homeScene', HomeScene);
game.scene.add('menuScene', MenuScene);
game.scene.add('instructScene', InstructScene);
game.scene.add('backstoryScene', BackStoryScene);
game.scene.add('gameOverScene', GameOverScene);
game.scene.add('platformScene', PlatformScene);

//At any point in the game, the menubar scene will always be displayed.
//The menubar will have links to the hub area, fundraising area, campaign area, debate area.
//Out of all the areas, the hub area and fundraising area will always be availiable.
//Once the user moves far enough into the game the campaign area will become always avaliable.
//The debate area will be created and destroyed as needed.

game.scene.start('menuScene');
game.scene.start('homeScene');
