import Phaser from "phaser";
import CampaignScene from "../scenes/CampaignScene";

export default class TimeController
{
    /**
     * 
     * @param {CampaignScene} scene 
     * @param {Phaser.GameObjects.Text} timerDisplay 
     */
    constructor(scene, timerDisplay)
    {
        this.scene = scene;
        this.timerDisplay = timerDisplay;
        this.day = 1;
        this.timerId = setInterval(() => {
            this.day++;
            this.timerDisplay.setText(`Day: ${this.day}`);
            this.passTime();
        }, 1000);
    }

    stopTimer()
    {
        clearInterval(this.timerId);
    }

    passTime()
    {
        this.scene.mapController.passTime(1);
    }
}
