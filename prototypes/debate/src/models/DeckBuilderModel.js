import CardModel from "./CardModel";

export default class DeckBuilderModel
{
    constructor()
    {
        this.allCardsDeck = new CardModel();
        this.chosenCardsDeck = new CardModel();
        this.updateViewCallback = null;
    }

    getAllCardsDeck()
    {
        return this.allCardsDeck;
    }

    getChosenCardsDeck()
    {
        return this.chosenCardsDeck;
    }

    /**
     * The updateViewCallback is a function that can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} updateViewCallback - The function that is called when this model gets updated.
     */
    setUpdateViewCallback(updateViewCallback)
    {
        this.updateViewCallback = updateViewCallback;
    }

    updateView()
    {
        if(this.updateViewCallback)
            this.updateViewCallback(this);
    }
}