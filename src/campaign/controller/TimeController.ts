import PlayerData from "../../data/PlayerData";
import CampaignScene from "../scenes/CampaignScene";

export default class TimeController
{
    private scene: CampaignScene; 
    private timerDisplay: Phaser.GameObjects.Text;
    //private day: number;
    private timerId: number;

    constructor(scene: CampaignScene, timerDisplay: Phaser.GameObjects.Text)
    {
        this.scene = scene;
        this.timerDisplay = timerDisplay;
        //this.day = 1;
        this.timerId = setInterval(() => {
            PlayerData.getGameData().setCurrentDay(PlayerData.getGameData().getCurrentDay() + 1);
            this.timerDisplay.setText(`Day: ${PlayerData.getGameData().getCurrentDay()} / 180`);
            this.passTime();
        }, 2000);
    }

    public stopTimer()
    {
        clearInterval(this.timerId);
    }

    public passTime()
    {
        this.scene.getTileMapController().passTime(1);
    }
}
