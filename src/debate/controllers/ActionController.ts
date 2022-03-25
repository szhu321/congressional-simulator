import ActionModel from "../models/ActionModel";

/**
 * The action controller is used to queue up actions, like playing a card, drawing a card, 
 * attcking the enemy etc. This queue would then be dequeued one item at a time so that
 * we can play the animations of the actions in order.
 */
export default class ActionController
{
    private model: ActionModel;

    /**
     * @param {ActionModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model: ActionModel)
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
    dequeueAction(): Function
    {
        return this.model.dequeue();
    }
}
