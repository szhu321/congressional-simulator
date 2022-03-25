import { SCENE_CONFIG } from '../../gameconfig';

export default class LeftPanelContainer extends Phaser.GameObjects.Container
{
    private maxLines: number;
    private vgap: number;
    private fontSize: number;
    private panelWidth: number;
    private panelHeight: number;
    private backgroundColor: number;
    private backgroundBorderWidth: number;
    private backgroundBorderColor: number;
    private texts: Phaser.GameObjects.Text[];

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        this.maxLines = 12;
        this.vgap = 50;
        this.fontSize = 20;
        this.panelWidth = 350;
        this.panelHeight = SCENE_CONFIG.scene_height;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
        this.texts = [];
        this.initialize();
    }

    private initialize()
    {
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.panelWidth, this.panelHeight, this.backgroundColor);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        background.setOrigin(0,0);
        this.add(background);

        for(let i = 0; i < this.maxLines; i++)
        {
            let text = this.scene.add.text(0, i * this.vgap, "" , {wordWrap: {width: this.panelWidth}});
            text.setFontSize(this.fontSize);
            this.add(text);
            this.texts.push(text);
        }
    }

    public updateDisplay(textArray: string[])
    {
        let texts = this.texts;
        for(let i = 0; i < texts.length; i++)
        {
            if(i < textArray.length)
            {
                texts[i].setText(textArray[i]);
            }
            else
            {
                texts[i].setText("");
            }
        }
    }
}