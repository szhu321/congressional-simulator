import ActionModel from "../models/ActionModel.js";

/**
 * The action controller is used to queue up actions, like playing a card, drawing a card, 
 * attcking the enemy etc. This queue would then be dequeued one item at a time so that
 * we can play the animations of the actions in order.
 */
export default class ActionController
{
    /**
     * @type {ActionModel}
     */
    model;

    /**
     * @param {BoardModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new ActionModel();
    }

    queueAction(func)
    {
        this.model.enqueue(func);
    }

    /**
     * @returns {Function} - The function that was queued up.
     */
    dequeueAction()
    {
        return this.model.dequeue();
    }
}
