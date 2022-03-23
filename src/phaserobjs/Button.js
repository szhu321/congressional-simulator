import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container
{
    constructor(scene, x = 0, y = 0, width = 50, height = 20, color = 0xffffff)
    {
        super(scene, x, y);
        this.background;
        this.text;
        this.onclickCallback;
        this.width = width;
        this.height = height;
        this.color = color;
        this.fontSize = 18;
        this.initialize();
    }

    initialize()
    {
        //callback
        this.onclickCallback = () => {console.log('button default callback.')};

        //background
        this.background = this.scene.add.rectangle(0, 0, this.width, this.height, this.color);
        this.background.setInteractive({useHandCursor: true});
        this.background.setOrigin(0.5, 0.5);
        this.background.on('pointerdown', this.onclickCallback);
        this.add(this.background);

        //text
        this.text = this.scene.add.text(0, 0, 'default');
        this.text.setOrigin(0.5, 0.5);
        this.text.setColor('#000000');
        this.text.setAlign('center');
        this.text.setFontSize(this.fontSize);
        //this.text.setDepth(10);
        this.add(this.text);
    }

    setOnclickCallback(onclickCallback)
    {
        this.onclickCallback = onclickCallback;
        this.background.removeAllListeners();
        this.background.addListener('pointerdown', this.onclickCallback);
    }
}