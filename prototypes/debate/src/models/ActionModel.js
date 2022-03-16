
export default class ActionModel
{
    /**
     * @type {Function[]}
     */
    queue;

    constructor()
    {
        this.queue = new Array();
    }

    enqueue(func)
    {
        this.queue.push(func);
    }

    dequeue()
    {
        return this.queue.shift();
    }
}

