/* Note that this file is a read only file that has the game configuation preset.
 * It will be used when the game starts up.
*/

/**
 * Configuration for the game window.
 */
export const GAME_CONFIG = {
    game_width: 1400,
    game_height: 800,
    game_version_number: "0.2",
}

/**
 * Configuration for the game menu at the top of the game window.
 */
export const MENU_CONFIG = {
    menu_height: 60,
    menu_width: GAME_CONFIG.game_width,
}

/**
 * Configuration for game scenes like the clicker scene, campaign scene and debate scene.
 */
export const SCENE_CONFIG = {
    scene_height: GAME_CONFIG.game_height - MENU_CONFIG.menu_height,
    scene_width: GAME_CONFIG.game_width,
    scene_camera_viewport_x: 0,
    scene_camera_viewport_y: MENU_CONFIG.menu_height,
    scene_background_color: 0x2F2F2F
}
