import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {

        let circle = this.add.circle(300, 300, 20, 0xcccccc);
        this.physics.add.existing(circle);
        circle.body.setVelocity(100, 200);
        circle.body.setBounce(1, 1);
        circle.body.setCollideWorldBounds(true);

        let title = this.add.text(400, 100, "Campaign Game");
        title.setOrigin(0.5, 0.5);
        title.setFontSize(64);


        let buttonX = 400;
        let buttonY = 400;
        let playButtonBackground = this.add.rectangle(buttonX, buttonY, 300, 60, 0xffffff);
        playButtonBackground.setOrigin(0.5, 0.5);
        let playButtonText = this.add.text(buttonX, buttonY, "Play");
        playButtonText.setOrigin(0.5, 0.5);
        playButtonText.setColor("#000000");
        playButtonText.setFontSize(36);
        playButtonBackground.setInteractive();
        playButtonBackground.on("pointerup", () => {
            console.log("Starting game...");
            this.game.scene.stop('game');
            this.game.scene.start('campaignScene');
        },this);


        
    }
}