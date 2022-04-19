import PlayerData from "../../data/PlayerData";
import EventDispatcher from "../../events/EventDispatcher";
import { GAME_CONFIG } from "../../gameconfig";
import { DAY_SPEED, GAME_EVENTS } from "../../gameenums";
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
        this.timerDisplay.setText(`Day: 0 / ${PlayerData.getGameData().getLastDay()}`);
        //this.day = 1;
        this.timerId = setInterval(() => {
            PlayerData.getGameData().setCurrentDay(PlayerData.getGameData().getCurrentDay() + 1);
            this.timerDisplay.setText(`Day: ${PlayerData.getGameData().getCurrentDay()} / 730`);
            this.passTime();
            if(PlayerData.getGameData().getLastDay() <= PlayerData.getGameData().getCurrentDay())
            {
                //stop timer
                clearInterval(this.timerId);
                //prepare gameover screen.
                EventDispatcher.getInstance().emit(GAME_EVENTS.DISPLAY_GAME_OVER_SCREEN);
            }
        }, DAY_SPEED.FASTER);
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
