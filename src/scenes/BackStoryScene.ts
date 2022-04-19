import {SCENE_CONFIG} from "../gameconfig";
import Button from "../phaserobjs/Button";
import RadioButton from "../phaserobjs/RadioButton";
import RadioButtonGroup from "../phaserobjs/RadioButtonGroup";

export default class BackStoryScene extends Phaser.Scene
{
    create()
    {
        this.initializeBackground();
        this.initializeCamera();


        let text = `
        GAME INFORMATION \n
        Congressional Simulator is a single page web based game. 
        The player will start out as a candidate for the house of representatives. They will progress through three different stages of the game. 
        The first stage is a clicker game where the player amasses money by smashing buttons. 
        With enough money the player will progress to the second stage. 
        The second stage is a campaign game where the player hires workers to campaign, which involves capturing tiles on a hexagonal map. 
        The third stage of the game unlocked concurrently with the second stage. 
        The third stage is a debate card game where the player participates in debates with their opponent to win over voters. \n
        \n\n
        BACK STORY \n
        You are an aspiring congressperson trying to get into office. You have no money. Either way your goal is to get the support of your people so you may get/stay in office.

        `
        let fontSize = 18;
        let textBoxWidth = SCENE_CONFIG.scene_width * (3/4);

        let textView = this.add.text(SCENE_CONFIG.scene_width / 2, 10, text);
        textView.setFontSize(fontSize);
        textView.setOrigin(0.5, 0);
        textView.setWordWrapWidth(textBoxWidth, true).setAlign('center');

        

        // //testing radio buttons.
        // let rb1 = new RadioButton(this, 300, 100, 250, 50);
        // rb1.getText().setText("Radio Button 1");
        // let rb2 = new RadioButton(this, 300, 200, 250, 50);
        // rb2.getText().setText("Radio Button 2");
        // let rb3 = new RadioButton(this, 300, 300, 250, 50);
        // rb3.getText().setText("Radio Button 3");
        // let rb4 = new RadioButton(this, 300, 400, 250, 50);
        // rb4.getText().setText("Radio Button 4");
        
        // let rbgroup = new RadioButtonGroup();
        // rbgroup.addRadioButtons(rb1, rb2, rb3, rb4);

        // this.add.existing(rb1);
        // this.add.existing(rb2);
        // this.add.existing(rb3);
        // this.add.existing(rb4);

        // let submitButton = new Button(this, 300, 500, 250, 50);
        // submitButton.getText().setText("Submit");
        // submitButton.setOnclickCallback(() => {
        //     let selectedRadioButton = rbgroup.getSelectedRadioButton();
        //     let selectedRadioButtonIdx = rbgroup.getSelectedRadioButtonIdx();
        //     console.log("button", selectedRadioButton);
        //     console.log("idx", selectedRadioButtonIdx);
        // });
        // this.add.existing(submitButton);
    }

    initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }
}