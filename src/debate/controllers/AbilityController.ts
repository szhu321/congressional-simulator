import AbilityModel from "../models/AbilityModel";

export default class AbilityController
{
    private model: AbilityModel;

    /**
     * @param {AbilityModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model: AbilityModel)
    {
        if(model)
            this.model = model;
        else
            this.model = new AbilityModel();
    }

}