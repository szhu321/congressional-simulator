/* Note that this file is a read only file that has the game configuation preset.
 * It will be used when the game starts up.
*/

/**
 * Configuration for the game window.
 */
const GAME_CONFIG = {
    game_width: 1400,
    game_height: 720
}

/**
 * Configuration for the game menu at the top of the game window.
 */
const MENU_CONFIG = {
    menu_height: 60,
    menu_width: GAME_CONFIG.game_width,
}

/**
 * Configuration for game scenes like the clicker scene, campaign scene and debate scene.
 */
const SCENE_CONFIG = {
    scene_height: GAME_CONFIG.game_height - MENU_CONFIG.menu_height,
    scene_width: GAME_CONFIG.game_width,
    scene_camera_viewport_x: 0,
    scene_camera_viewport_y: MENU_CONFIG.menu_height,
}

module.exports.MENU_CONFIG = MENU_CONFIG;
module.exports.GAME_CONFIG = GAME_CONFIG;
module.exports.SCENE_CONFIG = SCENE_CONFIG;