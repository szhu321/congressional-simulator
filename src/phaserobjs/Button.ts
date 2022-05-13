import { SCENE_CONFIG } from "../gameconfig";
import chroma = require("chroma-js");

export default class Button extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private onclickCallback: Function;
    private defaultOnclickCallback: Function;
    private buttonWidth: number;
    private buttonHeight: number;
    private buttonColor: number;
    private fontSize: number;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, width: number = 50, height: number = 20, color: number = 0xffffff)
    {
        super(scene, x, y);
        this.background;
        this.text;
        this.onclickCallback;
        this.buttonWidth = width;
        this.buttonHeight = height;
        this.buttonColor = color;
        this.fontSize = 18;
        this.initialize();
    }

    public getButtonHeight(): number{return this.buttonHeight;}
    public getButtonWidth(): number{return this.buttonWidth;}

    public getText(): Phaser.GameObjects.Text{return this.text;}

    private initialize()
    {
        //callback
        this.onclickCallback = () => {console.log('button default callback.')};
        this.defaultOnclickCallback = this.onclickCallback;

        //background
        this.background = this.scene.add.rectangle(0, 0, this.buttonWidth, this.buttonHeight, this.buttonColor);
        this.background.setInteractive({useHandCursor: true});
        this.background.setOrigin(0.5, 0.5);
        this.background.on('pointerdown', () => {
            this.onclickCallback();
            this.scene.sound.play('button');
        });
        this.add(this.background);

        //text
        this.text = this.scene.add.text(0, 0, 'default');
        this.text.setOrigin(0.5, 0.5);
        this.text.setColor('#000000');
        this.text.setAlign('center');
        this.text.setFontSize(this.fontSize);
        this.text.setFontFamily(SCENE_CONFIG.scene_font_family);
        //this.text.setDepth(10);
        this.add(this.text);
    }

    // public setOrigin(x: number, y: number)
    // {
    //     this.background.setOrigin(x, y);
    //     //this.text.setOrigin(x, y);
    // }

    public setOnclickCallback(onclickCallback: Function)
    {
        this.onclickCallback = onclickCallback;
        this.defaultOnclickCallback = this.onclickCallback;
        this.background.removeAllListeners();
        this.background.addListener('pointerup', this.onclickCallback);
    }

    public setBackgroundColor(color: number)
    {
        this.buttonColor = color;
        this.background.setFillStyle(color);
    }

    public disable()
    {
        let colorScale = chroma.scale(["000000", this.buttonColor.toString(16)]);
        let colorStr = colorScale(0.5).toString();
        let hexNum = parseInt(colorStr.substring(1), 16);
        this.background.setFillStyle(hexNum);

        //this.onclickCallback = () => {};
        this.background.disableInteractive();
    }

    public enable()
    {
        this.background.setFillStyle(this.buttonColor);

        //this.onclickCallback = this.defaultOnclickCallback;
        this.background.setInteractive();
        //this.background.on('pointerdown', this.onclickCallback);
    }
}