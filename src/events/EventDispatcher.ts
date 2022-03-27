
export default class EventDispatcher extends Phaser.Events.EventEmitter
{
    private static singleton: EventDispatcher;

    constructor()
    {
        super();
    }

    public static getInstance(): EventDispatcher
    {
        if(!EventDispatcher.singleton)
            EventDispatcher.singleton = new EventDispatcher();
        return EventDispatcher.singleton;
    }
}