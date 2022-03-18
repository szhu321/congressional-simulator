import AbilityModel from "../models/AbilityModel.js";

export default class AbilityController
{
    /**
     * @type {AbilityModel}
     */
    model;

    /**
     * @param {AbilityModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new AbilityModel();
    }

}