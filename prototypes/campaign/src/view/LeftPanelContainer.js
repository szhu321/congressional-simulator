import Phaser from 'phaser';

export default class LeftPanelContainer extends Phaser.GameObjects.Container
{
    constructor()
    {
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
        let texts = this.getChildren();
        for(let i = 0; i < texts.length; i++)
        {
            if(i < textArray.length)
            {
                texts.setText(textArray[i]);
            }
            else
            {
                texts.setText("");
            }
        }
    }
}