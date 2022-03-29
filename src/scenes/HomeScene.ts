import "phaser";
import Button from "../phaserobjs/Button";
import { GAME_CONFIG, SCENE_CONFIG } from "../gameconfig";

export default class HomeScene extends Phaser.Scene {
    private fundraisingButton: Button;
    private campaignButton: Button;
    private debateButton: Button;
    private feedbackButton: Button;

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
        this.initializeButtons();

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

    showScene(sceneName: string)
    {
        let sceneNames = ['campaignScene', 'homeScene', 'clickerScene', 'debateScene',
                            'instructScene'];
        for(let name of sceneNames)
        {
            if(this.scene.get(name) == null){
                continue;
            }
            let camera = this.scene.get(name).cameras.main;
            if(camera)
                this.changeCameraViewportOffScreen(camera);
        }
        let currentSceneCamera = this.scene.get(sceneName).cameras.main;
        this.changeCameraViewportOnScreen(currentSceneCamera);
    }

    changeCameraViewportOffScreen(camera: Phaser.Cameras.Scene2D.Camera)
    {
        let x = SCENE_CONFIG.scene_width + 100;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        camera.setViewport(x, y, width, height);
    }
 
    changeCameraViewportOnScreen(camera: Phaser.Cameras.Scene2D.Camera)
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        camera.setViewport(x, y, width, height);
    }

    initializeButtons()
    {
        let height = SCENE_CONFIG.scene_height;
        let buttonWidth = 220;
        let buttonHeight = 220;
        let buttonHGap = 100;
        let firstButtonStartX = 390;
        let fontSize = 26;
        let buttonTextYOffset = 97;

        //button1 Fundraising Game
        this.fundraisingButton = new Button(this, firstButtonStartX, height/2, buttonWidth, buttonHeight);
        this.fundraisingButton.getText().setText("");
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
            //window.open("https://forms.gle/CPLqcUc5CDEduhry6", "_blank");
        });
        this.add.existing(this.fundraisingButton);
        let fundraisingButtonText = this.add.text(this.fundraisingButton.x, this.fundraisingButton.y + ( this.fundraisingButton.height / 2 ) + buttonTextYOffset, "Fundraising");
        fundraisingButtonText.setOrigin(0.5, 0.5);
        fundraisingButtonText.setFontSize(fontSize);


        //button2 Campaign Game
        this.campaignButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 1, height/2, buttonWidth, buttonHeight);
        this.campaignButton.getText().setText("");
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
        this.debateButton.getText().setText("");
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

        //feedback button
        this.feedbackButton = new Button(this, 250/2 + 10, 35 / 2 + 10, 250, 35);
        this.feedbackButton.getText().setText("Feedback (google forms)");
        this.feedbackButton.setOnclickCallback(() => {
            console.log('Opening window to feedback form.');
            window.open("https://forms.gle/CPLqcUc5CDEduhry6", "_blank");
        });
        this.add.existing(this.feedbackButton);

        //verison text
        let verisonText = this.add.text(SCENE_CONFIG.scene_width - 10, SCENE_CONFIG.scene_height - 10, `ver ${GAME_CONFIG.game_version_number}`);
        verisonText.setOrigin(1, 1);
        verisonText.setFontSize(20);
    }
}