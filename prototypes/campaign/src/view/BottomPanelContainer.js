import Phaser from 'phaser';

export default class BottomPanelContainer extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene);
        this.width = 1050;
        this.height = 220;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
    }

    initialize()
    {
        console.log("Initializing bottom container..");
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.width, this.height, this.backgroundColor);
        background.setOrigin(1, 1);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        this.add(background);
    }
}