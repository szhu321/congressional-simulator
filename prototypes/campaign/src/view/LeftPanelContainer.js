import Phaser from 'phaser';

export default class LeftPanelContainer extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene);
        this.maxLines = 12;
        this.vgap = 50;
        this.fontSize = 20;
    }

    initialize()
    {
        for(let i = 0; i < this.maxLines; i++)
        {
            let text = this.scene.add.text(0, i * this.vgap, "");
            text.setFontSize(this.fontSize);
            this.add(text);
        }
    }

    updateDisplay(textArray)
    {
        let texts = this.getAll();
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