import Phaser from "phaser";
import Button from "../phaserobjs/Button.js";
import { SCENE_CONFIG } from "../gameconfig.js";

export default class HubScene extends Phaser.Scene {

    init()
    {
        //this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
    }

    preload() {
        //this.load.image('issueCard', 'assets/issue_card.png');
        //this.load.image('workerCard', 'assets/worker_card.png');
        
        let imagesData = [
            {
                key: 'campaignButton',
                url: 'assets/campaign_btn.png',
            },
            {
                key: 'debateButton',
                url: 'assets/debate_btn.png',
            },
            {
                key: 'fundraisingButton',
                url: 'assets/fundraising_btn.png',
            },
            
        ];

        for(let imageData of imagesData)
        {
            this.load.image(imageData.key, imageData.url);
        }
        //this.scene.get('menuScene').playerData.setMoney();
        // this.boardModel;
        // this.boardView;
        // this.boardController;
    }

    create()
    {
        this.initializeCamera();
        this.initializeBackground();
        this.initializeHubButtons();

        //add a title text.

        let x = SCENE_CONFIG.scene_width / 2;
        let y = 100;
        let fontSize = 48;
        let titleText = this.add.text(x, y, "Congressional Simulator");
        titleText.setFontSize(fontSize);
        titleText.setOrigin(0.5, 0.5);

        
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

    showScene(sceneName)
    {
        let sceneNames = ['campaignScene', 'hubScene', 'clickerScene', 'debateScene'];
        for(let name of sceneNames)
        {
            let camera = this.scene.get(name).cameras.main;
            if(camera)
                this.changeCameraViewportOffScreen(camera);
        }
        let currentSceneCamera = this.scene.get(sceneName).cameras.main;
        this.changeCameraViewportOnScreen(currentSceneCamera);
    }

    /**
     * 
     * @param {Phaser.Cameras.Scene2D.Camera} camera 
     */
    changeCameraViewportOffScreen(camera)
    {
        let x = SCENE_CONFIG.scene_width + 100;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        camera.setViewport(x, y, width, height);
    }
 
    /**
     * 
     * @param {Phaser.Cameras.Scene2D.Camera} camera 
     */
    changeCameraViewportOnScreen(camera)
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        camera.setViewport(x, y, width, height);
    }

    initializeHubButtons()
    {
        let height = SCENE_CONFIG.scene_height;
        let buttonWidth = 220;
        let buttonHeight = 220;
        let buttonHGap = 100;
        let firstButtonStartX = 390;
        let fontSize = 26;
        let buttonTextYOffset = 20;

        //button1 Fundraising Game
        this.fundraisingButton = new Button(this, firstButtonStartX, height/2, buttonWidth, buttonHeight);
        this.fundraisingButton.text.setText("");
        let fundraisingButtonImage = this.add.image(0,0,'fundraisingButton');
        fundraisingButtonImage.setDisplaySize(buttonWidth, buttonHeight);
        this.fundraisingButton.add(fundraisingButtonImage);
        this.fundraisingButton.setOnclickCallback(() => {
            console.log('switching to clicker game');
            //this.scene.switch('clickerScene');
            if(!this.scene.isActive('clickerScene'))
                this.scene.launch('clickerScene');
            this.showScene('clickerScene');
            //console.log(this.scene.get('clickerScene'));
        });
        this.add.existing(this.fundraisingButton);
        let fundraisingButtonText = this.add.text(this.fundraisingButton.x, this.fundraisingButton.y + ( this.fundraisingButton.height / 2 ) + buttonTextYOffset, "Fundraising");
        fundraisingButtonText.setOrigin(0.5, 0.5);
        fundraisingButtonText.setFontSize(fontSize);


        //button2 Campaign Game
        this.campaignButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 1, height/2, buttonWidth, buttonHeight);
        this.campaignButton.text.setText("");
        let campaignButtonImage = this.add.image(0,0,'campaignButton');
        campaignButtonImage.setDisplaySize(buttonWidth, buttonHeight);
        this.campaignButton.add(campaignButtonImage);
        this.campaignButton.setOnclickCallback(() => {
            //this.scene.switch('campaignScene');
            if(!this.scene.isActive('campaignScene'))
                this.scene.launch('campaignScene');
            this.showScene('campaignScene');
        });
        this.add.existing(this.campaignButton);
        let campaignButtonText = this.add.text(this.campaignButton.x, this.campaignButton.y + ( this.campaignButton.height / 2 ) + buttonTextYOffset, "Campaign");
        campaignButtonText.setOrigin(0.5, 0.5);
        campaignButtonText.setFontSize(fontSize);


        //button3 Debate Game
        this.debateButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 2, height/2, buttonWidth, buttonHeight);
        this.debateButton.text.setText("");
        let debateButtonImage = this.add.image(0,0,'debateButton');
        debateButtonImage.setDisplaySize(buttonWidth, buttonHeight);
        this.debateButton.add(debateButtonImage);
        this.debateButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('debateScene'))
                this.scene.launch('debateScene');
            this.showScene('debateScene');
        });
        this.add.existing(this.debateButton);
        let debateButtonText = this.add.text(this.debateButton.x, this.debateButton.y + ( this.debateButton.height / 2 ) + buttonTextYOffset, "Debate");
        debateButtonText.setOrigin(0.5, 0.5);
        debateButtonText.setFontSize(fontSize);
    }
}