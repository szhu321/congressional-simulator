import Phaser from "phaser";
import Button from "../phaserobjs/Button.js";

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
        let height = this.game.scale.height;
        //button1 Fundraising Game
        this.fundraisingButton = new Button(this, 200, height/2, 200, 200);
        this.fundraisingButton.text.setText("Fundraising");
        this.fundraisingButton.setOnclickCallback(() => {
            console.log('switching to clicker game');
            this.scene.switch('clickerScene');
        });
        this.add.existing(this.fundraisingButton);

        //button2 Campaign Game
        this.campaignButton = new Button(this, 500, height/2, 200, 200);
        this.campaignButton.text.setText("Campaign");
        
        this.campaignButton.setOnclickCallback(() => {
            this.scene.switch('campaignScene');
        });
        this.add.existing(this.campaignButton);


        //button3 Debate Game
        this.debateButton = new Button(this, 800, height/2, 200, 200);
        this.debateButton.text.setText("Debate");
        this.debateButton.setOnclickCallback(() => {
            this.scene.switch('debateScene');
        });
        this.add.existing(this.debateButton);
    }
}