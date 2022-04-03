
export default class GameModel
{
    private currentDay: number;
    private lastDay: number;

    constructor()
    {
        this.currentDay = 0;
        this.lastDay = 180;
    }

    public getCurrentDay(): number {return this.currentDay;}
    public setCurrentDay(value: number) {this.currentDay = value;}
    public getLastDay(): number {return this.lastDay;}
    public setLastDay(value: number) {this.lastDay = value;}
}