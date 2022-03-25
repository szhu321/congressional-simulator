
export default class ActionModel
{
    private queue: Function[];

    constructor()
    {
        this.queue = new Array();
    }

    enqueue(func: Function)
    {
        this.queue.push(func);
    }

    dequeue()
    {
        return this.queue.shift();
    }
}

