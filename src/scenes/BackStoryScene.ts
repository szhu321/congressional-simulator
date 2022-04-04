import {SCENE_CONFIG} from "../gameconfig";

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