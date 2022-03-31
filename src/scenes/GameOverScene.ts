import {SCENE_CONFIG} from "../gameconfig";

export default class GameOverScene extends Phaser.Scene
{
    create()
    {
        this.initializeBackground();
        this.initializeCamera();

        let text = `
        GAME OVER \n\n\n
        YOU WON
        `
        let fontSize = 64;
        let textBoxWidth = SCENE_CONFIG.scene_width * (3/4);

        let textView = this.add.text(SCENE_CONFIG.scene_width / 2, 10, text);
        textView.setFontSize(fontSize);
        textView.setOrigin(0.5, 0);
        textView.setWordWrapWidth(textBoxWidth, true).setAlign('center');
    }

    initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }
}