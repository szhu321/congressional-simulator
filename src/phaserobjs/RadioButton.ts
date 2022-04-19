import Button from "./Button";
import RadioButtonGroup from "./RadioButtonGroup";

export default class RadioButton extends Button
{
    private radioButtonFilled: Phaser.GameObjects.Image;
    private radioButtonUnfilled: Phaser.GameObjects.Image;
    private radioButtonGroup: RadioButtonGroup;
    private selected: boolean;

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, width: number = 50, height: number = 20, color: number = 0xffffff)
    {
        super(scene, x, y, width, height, color);
        
        let circleScale = 0.7;


        // initialize the images.
        this.radioButtonFilled = scene.add.image(0, 0, "radioButtonFilled");
        this.radioButtonUnfilled = scene.add.image(0, 0, "radioButtonUnfilled");
        let length = Math.min(width, height);
        let scalePixels = length * circleScale;
        this.radioButtonFilled.setDisplaySize(scalePixels, scalePixels);
        this.radioButtonFilled.setOrigin(0.5, 0.5);
        this.radioButtonFilled.setX(- width / 2 + (length / 2));
        this.radioButtonUnfilled.setDisplaySize(scalePixels, scalePixels);
        this.radioButtonUnfilled.setOrigin(0.5, 0.5);
        this.radioButtonUnfilled.setX(- width / 2 + (length / 2));
        this.add(this.radioButtonFilled);
        this.add(this.radioButtonUnfilled); 
        this.setSelected(false);
        // update text so that it appears to the right of the circles.
        let text = this.getText();
        text.setOrigin(0, 0.5);
        text.setX(- width / 2 + length);


        // add the radio button callback.
        this.setOnclickCallback(() => {
            this.handleRadioButtonClick();
        });
    }

    private handleRadioButtonClick()
    {
        this.setSelected(true);
        if(this.radioButtonGroup != null)
        {
            this.radioButtonGroup.selectRadioButton(this);
        }
    }

    public setRadioButtonGroup(value: RadioButtonGroup)
    {
        this.radioButtonGroup = value;
    }

    public isSelected(): boolean
    {
        return this.selected;
    }

    public setSelected(value: boolean)
    {
        this.selected = value;
        if(this.selected)
        {
            this.showFilled();
        }
        else
        {
            this.showUnfilled();
        }
    }

    public showUnfilled()
    {
        this.radioButtonFilled.setVisible(false);
        this.radioButtonUnfilled.setVisible(true);
    }

    public showFilled()
    {
        this.radioButtonFilled.setVisible(true);
        this.radioButtonUnfilled.setVisible(false);
    }
}