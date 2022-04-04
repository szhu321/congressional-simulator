
export default class GameModel
{
    private currentDay: number;
    private lastDay: number;
    private debateInSession: boolean;

    constructor()
    {
        this.currentDay = 0;
        this.lastDay = 180;
        this.debateInSession = false;
    }

    public getCurrentDay(): number {return this.currentDay;}
    public setCurrentDay(value: number) {this.currentDay = value;}
    public getLastDay(): number {return this.lastDay;}
    public setLastDay(value: number) {this.lastDay = value;}
    public isDebateInSession(): boolean {return this.debateInSession;}
    public setDebateInSession(value: boolean) {this.debateInSession = value;}
}