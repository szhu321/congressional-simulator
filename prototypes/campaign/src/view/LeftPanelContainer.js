import Phaser from 'phaser';

export default class LeftPanelContainer extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene);
        this.maxLines = 12;
        this.vgap = 50;
        this.fontSize = 20;
        this.width = 350;
        this.height = 720;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
        this.texts = [];
    }

    initialize()
    {
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.width, this.height, this.backgroundColor);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        background.setOrigin(0,0);
        this.add(background);

        for(let i = 0; i < this.maxLines; i++)
        {
            let text = this.scene.add.text(0, i * this.vgap, "" , {wordWrap: {width: this.width}});
            text.setFontSize(this.fontSize);
            this.add(text);
            this.texts.push(text);
        }
    }

    updateDisplay(textArray)
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