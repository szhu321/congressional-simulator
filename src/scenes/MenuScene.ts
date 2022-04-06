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

    init()
    {
        //this.data.set({playerBattleFunds: 450, opponentBattleFunds: 450, playerVotes: 10, opponentVotes: 10, playerDeckSize: 20, opponentDeckSize: 20});
    }

    preload() {
        this.load.image('issueCard', 'assets/issue_card.png');
        this.load.image('workerCard', 'assets/worker_card.png');
    }

    create()
    {
        this.initializeMenu();
        //PlayerData.getPlayer().addMoney(5000);
        //player name.
        this.playerNameText = this.add.text(MENU_CONFIG.menu_width - 5, 5, "[Name]");
        this.playerNameText.setOrigin(1, 0);
        this.playerNameText.setFontSize(20);

        //player money.
        this.playerMoneyText = this.add.text(MENU_CONFIG.menu_width - 150, MENU_CONFIG.menu_height - 5, "$100");
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

        //start the campaign scene.
        if(!this.scene.isActive("campaignScene"))
            this.scene.launch("campaignScene");
        this.showScene("campaignScene");

        //switch back to homescene;
        if(!this.scene.isActive("homeScene"))
            this.scene.launch("homeScene");
        this.showScene("homeScene");
    }

    update()
    {
        //updates the data on the menu.
        let money = PlayerData.getPlayer().getMoney();
        let moneySpent = PlayerData.getPlayer().getMoneySpent();
        this.playerMoneyText.setText(`$${(money - moneySpent).toFixed(2)}`);
        this.gameDayText.setText(`Day:${PlayerData.getGameData().getCurrentDay()}/180`);
        this.debateButton.setVisible(PlayerData.getGameData().isDebateInSession());
    }

    showScene(sceneName: string)
    {
        let sceneNames = ['campaignScene', 'homeScene', 'clickerScene', 'debateScene',
                            'instructScene', 'backstoryScene', 'gameOverScene'];
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

    private addMenuButton(sceneName: string, buttonText: string, positionNumber: number): Button
    {
        let firstButtonStartX = 100;
        let height = MENU_CONFIG.menu_height;
        let buttonHGap = 30;
        let buttonWidth = 130;
        let buttonHeight = 30;
        let button = new Button(this, firstButtonStartX + (buttonHGap + buttonWidth) * positionNumber, height/2, buttonWidth, buttonHeight);
        button.getText().setText(buttonText);
        button.setOnclickCallback(() => {
            //console.log('switching to clicker game');
            //this.scene.switch('clickerScene');
            if(!this.scene.isActive(sceneName))
                this.scene.launch(sceneName);
            this.showScene(sceneName);
        });
        this.add.existing(button);
        return button;
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
        this.fundraisingButton = this.addMenuButton("clickerScene", "Fundraising", 1);
        this.campaignButton = this.addMenuButton("campaignScene", "Campaign", 2);
        this.debateButton = this.addMenuButton("debateScene", "Debate", 3);
        this.debateButton.setBackgroundColor(0xeba134);
        this.instructButton = this.addMenuButton("instructScene", "Instructions", 4);
        this.backstoryButton = this.addMenuButton("backstoryScene", "Back Story", 5);
        this.gameOverButton = this.addMenuButton("gameOverScene", "GameOver", 6);
        this.gameOverButton.setVisible(false);
    }
}