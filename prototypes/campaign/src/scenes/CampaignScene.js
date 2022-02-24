import Phaser from "phaser";

export default class CampaignScene extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        this.add.text(200, 200, 'Hello World');
        let polygon = this.add.polygon(300, 300, [0, 0, 100, 100, 100, 0], 0xffffff);
        polygon.setOrigin(0.5, 0.5);
    }
}