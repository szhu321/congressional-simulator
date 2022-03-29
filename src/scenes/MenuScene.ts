import "phaser";
import Button from "../phaserobjs/Button";
import { MENU_CONFIG, SCENE_CONFIG } from "../gameconfig";
import PlayerData from "../data/PlayerData";
import PlayerModel from "../model/PlayerModel";

export default class MenuScene extends Phaser.Scene {
    private playerNameText: Phaser.GameObjects.Text;
    private playerMoneyText: Phaser.GameObjects.Text;
    private background: Phaser.GameObjects.Rectangle;
    private fundraisingButton: Button;
    private campaignButton: Button;
    private debateButton: Button;
    private homeButton: Button;
    private instructButton: Button;
    private backstoryButton: Button;

    init()
    {
        //this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
    }

    preload() {
        this.load.image('issueCard', 'assets/issue_card.png');
        this.load.image('workerCard', 'assets/worker_card.png');
        // this.boardModel;
        // this.boardView;
        // this.boardController;
    }

    create()
    {
        this.initializeMenu();

        // //set the player data.
        // let player = new PlayerModel();
        // this.playerData = new PlayerData();
        // this.playerData.setPlayer(player);

        //player name.
        this.playerNameText = this.add.text(MENU_CONFIG.menu_width - 5, 5, "Sheng Wei");
        this.playerNameText.setOrigin(1, 0);
        this.playerNameText.setFontSize(20);

        //player money.
        this.playerMoneyText = this.add.text(MENU_CONFIG.menu_width - 5, MENU_CONFIG.menu_height - 5, "$100");
        this.playerMoneyText.setOrigin(1, 1);
        this.playerMoneyText.setFontSize(20);
    }

    update()
    {
        //updates the data on the menu.
        let money = PlayerData.getPlayer().getMoney();
        let moneySpent = PlayerData.getPlayer().getMoneySpent();
        this.playerMoneyText.setText(`$${(money - moneySpent).toFixed(2)}`);
    }

    // hideScenes()
    // {
    //     this.scene.pause('campaignScene');
    //     this.scene.pause('hubScene');
    //     this.scene.pause('clickerScene');
    //     this.scene.pause('debateScene');
    // }

    showScene(sceneName: string)
    {
        let sceneNames = ['campaignScene', 'homeScene', 'clickerScene', 'debateScene',
                            'instructScene', 'backstoryScene'];
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

    initializeMenu()
    {
        let height = MENU_CONFIG.menu_height;
        let width = MENU_CONFIG.menu_width;
        let menubarX = 0;
        let menubarY = 0;
        let buttonWidth = 120;
        let buttonHeight = 30;
        let buttonHGap = 50;
        let firstButtonStartX = 250;
        let backgroundColor = 0x1976D2;
        this.cameras.main.setViewport(menubarX, menubarY, width, height);

        //menu background
        this.background = this.add.rectangle(menubarX, menubarY, width, height, backgroundColor);
        this.background.setOrigin(0, 0);

        //button1 Fundraising Game
        this.fundraisingButton = new Button(this, firstButtonStartX, height/2, buttonWidth, buttonHeight);
        this.fundraisingButton.getText().setText("Fundraising");
        this.fundraisingButton.setOnclickCallback(() => {
            console.log('switching to clicker game');
            //this.scene.switch('clickerScene');
            if(!this.scene.isActive('clickerScene'))
                this.scene.launch('clickerScene');
            this.showScene('clickerScene');
            //this.scene.get('clickerScene').scene.resume();
            //this.scene.bringToTop('clickerScene');
            //this.scene.get('clickerScene').scene.setVisible(true);
            //this.scene.bringToTop('clickerScene');
            
            //console.log(this.scene.get('clickerScene'));
        });
        this.add.existing(this.fundraisingButton);

        //button2 Campaign Game
        this.campaignButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 1, height/2, buttonWidth, buttonHeight);
        this.campaignButton.getText().setText("Campaign");
        
        this.campaignButton.setOnclickCallback(() => {
            //this.scene.switch('campaignScene');
            if(!this.scene.isActive('campaignScene'))
                this.scene.launch('campaignScene');
            this.showScene('campaignScene');
        });
        this.add.existing(this.campaignButton);


        //button3 Debate Game
        this.debateButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 2, height/2, buttonWidth, buttonHeight);
        this.debateButton.getText().setText("Debate");
        this.debateButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('debateScene'))
                this.scene.launch('debateScene');
            this.showScene('debateScene');
        });
        this.add.existing(this.debateButton);

        //button4 hub
        this.homeButton = new Button(this, 80, height/2, buttonWidth, buttonHeight);
        this.homeButton.getText().setText("HOME");
        this.homeButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('homeScene'))
                this.scene.launch('homeScene');
            this.showScene('homeScene');
        });
        this.add.existing(this.homeButton);

        //button5 instructions
        this.instructButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 3, height/2, buttonWidth + 15, buttonHeight);
        this.instructButton.getText().setText("Instructions");
        this.instructButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('instructScene'))
                this.scene.launch('instructScene');
            this.showScene('instructScene');
        });
        this.add.existing(this.instructButton);

        //button6 backstory
        this.backstoryButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 4, height/2, buttonWidth + 10, buttonHeight);
        this.backstoryButton.getText().setText("Back Story");
        this.backstoryButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('backstoryScene'))
                this.scene.launch('backstoryScene');
            this.showScene('backstoryScene');
        });
        this.add.existing(this.backstoryButton);
    }
}