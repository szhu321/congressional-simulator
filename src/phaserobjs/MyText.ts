import { SCENE_CONFIG } from "../gameconfig";

/**
 * MyText is a Phaser Text object that have some preset configurations.
 */
export default class MyText extends Phaser.GameObjects.Text
{
    constructor(scene: Phaser.Scene, x: number, y: number, text: string)
    {
        super(scene, x, y, text, {});
        let fontSize = 24;

        this.setOrigin(0.5, 0.5);
        this.setColor('#000000');
        this.setAlign('center');
        this.setFontSize(fontSize);
        this.setFontFamily(SCENE_CONFIG.scene_font_family);
    }
}