import "phaser";
import Button from "../phaserobjs/Button";
import { MENU_CONFIG, SCENE_CONFIG } from "../gameconfig";
import PlayerData from "../data/PlayerData";
import PlayerModel from "../model/PlayerModel";
import EventDispatcher from "../events/EventDispatcher";
import { GAME_EVENTS } from "../gameenums";
import { CANDIDATE } from "../campaign/campaignenum";
import Tile from "../campaign/model/Tile";
import DebateScene from "../debate/scenes/DebateScene";

export default class MenuScene extends Phaser.Scene {
    private playerNameText: Phaser.GameObjects.Text;
    private playerMoneyText: Phaser.GameObjects.Text;
    private gameDayText: Phaser.GameObjects.Text;
    private background: Phaser.GameObjects.Rectangle;
    private fundraisingButton: Button;
    private campaignButton: Button;
    private debateButton: Button;
    private homeButton: Button;
    private instructButton: Button;
    private backstoryButton: Button;
    private gameOverButton: Button;
    private platformButton: Button;

    private allButtons: Button[];

    init()
    {
        //this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
        //this.input.mousePointer.camera = this.cameras.main;
        this.allButtons = new Array<Button>();
    }

    preload() {
        this.load.image('issueCard', 'assets/issue_card.png');
        this.load.image('workerCard', 'assets/worker_card.png');
        this.load.image('radioButtonFilled', 'assets/radio_button_filled.png');
        this.load.image('radioButtonUnfilled', 'assets/radio_button_unfilled.png');
        this.load.image('tile_city', 'assets/tile_city.png');
        this.load.image('tile_rural', 'assets/tile_rural.png');
        this.load.image('tile_town', 'assets/tile_town.png');
        this.load.audio('button', 'assets/button_press.mp3');
        this.load.audio('game_music', 'assets/game_music.mp3');
    }

    create()
    {
        this.sound.add('button');
        this.sound.add('game_music');

        this.initializeMenu();
        //PlayerData.getPlayer().addMoney(5000);
        //player name.
        this.playerNameText = this.add.text(MENU_CONFIG.menu_width - 5, 5, "[Name]");
        this.playerNameText.setOrigin(1, 0);
        this.playerNameText.setFontSize(20);

        //player money.
        this.playerMoneyText = this.add.text(MENU_CONFIG.menu_width - 180, MENU_CONFIG.menu_height - 5, "$100");
        this.playerMoneyText.setOrigin(1, 1);
        this.playerMoneyText.setFontSize(20);
        //this.fundraisingButton.setVisible(false);
        //add event for gameover scene.
        this.gameDayText = this.add.text(MENU_CONFIG.menu_width - 5, MENU_CONFIG.menu_height - 5, "Day:0/180");
        this.gameDayText.setOrigin(1, 1);
        this.gameDayText.setFontSize(20);

        EventDispatcher.getInstance().on(GAME_EVENTS.DISPLAY_GAME_OVER_SCREEN, () => {
            if(!this.scene.isActive("gameOverScene"))
                this.scene.launch("gameOverScene");
            this.showScene("gameOverScene");
            this.gameOverButton.setVisible(true);
        });

        EventDispatcher.getInstance().on(GAME_EVENTS.START_GAME, this.handleStartGame, this);

        EventDispatcher.getInstance().on(GAME_EVENTS.START_DEBATE_GAME, () => {
            PlayerData.getGameData().setDebateInSession(true);
            PlayerData.getGameData().setDebateTile(PlayerData.getCampaignData().getSelectedTile());
            // setTimeout(() => {
            //     if(!this.scene.isActive("debateScene"))
            //         this.scene.launch("debateScene");
            //     this.showScene("debateScene");
            // }, 200);
        }, this);

        EventDispatcher.getInstance().on(GAME_EVENTS.END_DEBATE_GAME, (winner: CANDIDATE) => {
            PlayerData.getGameData().setDebateInSession(false);
            let tile = PlayerData.getGameData().getDebateTile();
            if(tile)
            {
                //handle debate winner.
                let playerOccupied = tile.getAmountOccupiedBy(CANDIDATE.PLAYER)
                let opponentOccupied = tile.getAmountOccupiedBy(CANDIDATE.OPPONENT);
                if(winner == CANDIDATE.PLAYER)
                {
                    tile.occupy(CANDIDATE.PLAYER ,tile.deoccupy(CANDIDATE.OPPONENT, opponentOccupied));
                }
                else
                {
                    tile.occupy(CANDIDATE.OPPONENT, tile.deoccupy(CANDIDATE.PLAYER, playerOccupied));
                }
            }
            if(!this.scene.isActive("homeScene"))
                this.scene.launch("homeScene");
            this.showScene("homeScene");

            this.scene.remove("debateScene");
            this.scene.add("debateScene", DebateScene);
        });

        console.log("Campaign Scene active", this.scene.isActive("campaignScene"));
        console.log("Home Scene active", this.scene.isActive("homeScene"));

        this.sound.play('game_music', {loop: true});


        // //start the campaign scene.
        // if(!this.scene.isActive("campaignScene"))
        //     this.scene.launch("campaignScene");
        // this.showScene("campaignScene");

        // //switch back to homescene;
        // if(!this.scene.isActive("homeScene"))
        //     this.scene.launch("homeScene");
        // this.showScene("homeScene");
        // let camera = this.scene.get("campaignScene").cameras.main;
        // this.changeCameraViewportOffScreen(camera);
    }

    update()
    {
        //updates the data on the menu.
        let money = PlayerData.getPlayer().getMoney();
        let moneySpent = PlayerData.getPlayer().getMoneySpent();
        this.playerMoneyText.setText(`$${(money - moneySpent).toFixed(2)}`);
        this.gameDayText.setText(`Day: ${PlayerData.getGameData().getCurrentDay()}/${PlayerData.getGameData().getLastDay()}`);
        this.debateButton.setVisible(PlayerData.getGameData().isDebateInSession());
        this.playerNameText.setText(PlayerData.getPlayer().getPoliticalParty());
    }

    showScene(sceneName: string)
    {
        //LIST OF SCENE NAMES.
        let sceneNames = ['campaignScene', 'homeScene', 'fundraiseScene', 'debateScene',
                            'instructScene', 'backstoryScene', 'gameOverScene', 'platformScene'];
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
        let x = SCENE_CONFIG.scene_width + 3000;
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

    private handleStartGame()
    {
        this.fundraisingButton.setVisible(true);
        this.campaignButton.setVisible(true);
        this.homeButton.setVisible(true);
        if(!this.scene.isActive("campaignScene"))
            this.scene.launch("campaignScene");
        this.showScene("platformScene");
        // if(!this.scene.isActive("homeScene"))
        //     this.scene.launch("homeScene");
        // this.showScene("homeScene");
    }

    private addMenuButton(sceneName: string, buttonText: string, positionNumber: number): Button
    {
        let firstButtonStartX = 90;
        let height = MENU_CONFIG.menu_height;
        let buttonHGap = 10;
        let buttonWidth = 120;
        let buttonHeight = 30;
        let button = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * positionNumber, height/2, buttonWidth, buttonHeight);
        button.getText().setText(buttonText)
        button.getText().setFontSize(14);
        button.getText().setFontFamily(MENU_CONFIG.menu_font_family);
        button.getText().setFontStyle("bold");
        button.setOnclickCallback(() => {
            //console.log('switching to clicker game');
            //this.scene.switch('clickerScene');
            if(!this.scene.isActive(sceneName))
                this.scene.launch(sceneName);
            this.showScene(sceneName);
            this.selectButton(button);
            this.sound.play('button');
            //button.disableInteractive();
        });
        this.add.existing(button);
        return button;
    }

    private selectButton(button: Button)
    {
        if(this.allButtons.indexOf(button) !== -1)
        {
            for(let btn of this.allButtons)
            {
                btn.enable();
            }
            button.disable();
        }
    }

    private initializeMenu()
    {
        let height = MENU_CONFIG.menu_height;
        let width = MENU_CONFIG.menu_width;
        let menubarX = 0;
        let menubarY = 0;
        let backgroundColor = 0x1976D2;
        this.cameras.main.setViewport(menubarX, menubarY, width, height);

        //menu background
        this.background = this.add.rectangle(menubarX, menubarY, width, height, backgroundColor);
        this.background.setOrigin(0, 0);

        this.homeButton = this.addMenuButton("homeScene", "Home", 0);
        this.fundraisingButton = this.addMenuButton("fundraiseScene", "Fundraising", 1);
        this.campaignButton = this.addMenuButton("campaignScene", "Campaign", 2);
        this.platformButton = this.addMenuButton("platformScene", "Platform", 3);
        this.platformButton.getText().setFontSize(12);
        this.debateButton = this.addMenuButton("debateScene", "Debate", 4);
        this.debateButton.setBackgroundColor(0xeba134);
        this.instructButton = this.addMenuButton("instructScene", "Instructions", 5);
        this.backstoryButton = this.addMenuButton("backstoryScene", "Back Story", 6);
        this.gameOverButton = this.addMenuButton("gameOverScene", "Game Over", 7);
        
        this.gameOverButton.setVisible(false);
        this.fundraisingButton.setVisible(false);
        this.campaignButton.setVisible(false);
        this.homeButton.setVisible(false);

        

        this.allButtons.push(this.homeButton);
        this.allButtons.push(this.fundraisingButton);
        this.allButtons.push(this.campaignButton);
        this.allButtons.push(this.platformButton);
        this.allButtons.push(this.debateButton);
        this.allButtons.push(this.instructButton);
        this.allButtons.push(this.backstoryButton);
        this.allButtons.push(this.gameOverButton);

        this.selectButton(this.platformButton);
    }
}