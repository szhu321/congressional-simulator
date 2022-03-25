import CampaignScene from "../scenes/CampaignScene";

export default class TimeController
{
    private scene: CampaignScene; 
    private timerDisplay: Phaser.GameObjects.Text;
    private day: number;
    private timerId: number;

    constructor(scene: CampaignScene, timerDisplay: Phaser.GameObjects.Text)
    {
        this.scene = scene;
        this.timerDisplay = timerDisplay;
        this.day = 1;
        this.timerId = setInterval(() => {
            this.day++;
            this.timerDisplay.setText(`Day: ${this.day}`);
            this.passTime();
        }, 3000);
    }

    public stopTimer()
    {
        clearInterval(this.timerId);
    }

    public passTime()
    {
        this.scene.getMapController().passTime(1);
    }
}
