import DeckBuilderModel from "../models/DeckBuilderModel";

export default class DeckBuilderController
{
    private model: DeckBuilderModel;

    /**
     * @param {DeckBuilderModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model: DeckBuilderModel)
    {
        if(model)
            this.model = model;
        else
            this.model = new DeckBuilderModel();
    }
}