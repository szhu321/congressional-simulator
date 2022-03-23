import Phaser from "phaser";
import Button from "../phaserobjs/Button.js";
import { MENU_CONFIG, SCENE_CONFIG } from "../gameconfig.js";
import PlayerData from "../data/PlayerData.js";
import PlayerModel from "../model/PlayerModel.js";

export default class MenuScene extends Phaser.Scene {

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

        //set the player data.
        let player = new PlayerModel();
        this.playerData = new PlayerData();
        this.playerData.setPlayer(player);

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
        let money = this.playerData.getPlayer().getMoney();
        this.playerMoneyText.setText(`$${Math.round(money * 100) / 100}`);
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
        this.fundraisingButton.text.setText("Fundraising");
        this.fundraisingButton.setOnclickCallback(() => {
            console.log('switching to clicker game');
            //this.scene.switch('clickerScene');
            if(!this.scene.isActive('clickerScene'))
                this.scene.launch('clickerScene');
            this.scene.bringToTop('clickerScene');
            //console.log(this.scene.get('clickerScene'));
        });
        this.add.existing(this.fundraisingButton);

        //button2 Campaign Game
        this.campaignButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 1, height/2, buttonWidth, buttonHeight);
        this.campaignButton.text.setText("Campaign");
        
        this.campaignButton.setOnclickCallback(() => {
            //this.scene.switch('campaignScene');
            if(!this.scene.isActive('campaignScene'))
                this.scene.launch('campaignScene');
            this.scene.bringToTop('campaignScene');
        });
        this.add.existing(this.campaignButton);


        //button3 Debate Game
        this.debateButton = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * 2, height/2, buttonWidth, buttonHeight);
        this.debateButton.text.setText("Debate");
        this.debateButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('debateScene'))
                this.scene.launch('debateScene');
            this.scene.bringToTop('debateScene');
        });
        this.add.existing(this.debateButton);

        //button4 hub
        this.hubButton = new Button(this, 80, height/2, buttonWidth, buttonHeight);
        this.hubButton.text.setText("HOME");
        this.hubButton.setOnclickCallback(() => {
            //this.scene.switch('debateScene');
            if(!this.scene.isActive('hubScene'))
                this.scene.launch('hubScene');
            this.scene.bringToTop('hubScene');
        });
        this.add.existing(this.hubButton);
    }
}