
export default class Button extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private onclickCallback: Function;
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

        //background
        this.background = this.scene.add.rectangle(0, 0, this.buttonWidth, this.buttonHeight, this.buttonColor);
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

    public setOnclickCallback(onclickCallback: Function)
    {
        this.onclickCallback = onclickCallback;
        this.background.removeAllListeners();
        this.background.addListener('pointerdown', this.onclickCallback);
    }
}