import DeckModel from "./DeckModel";

export default class DeckBuilderModel
{
    private allCardsDeck: DeckModel;
    private chosenCardsDeck: DeckModel;
    private view: Function;

    constructor()
    {
        this.allCardsDeck = new DeckModel();
        this.chosenCardsDeck = new DeckModel();
        this.view = null;
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
     * The view has a function called updateViewCallback(model) can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} view - The view for this model.
     */
    setView(view: Function)
    {
        this.view = view;
    }

    updateView()
    {
        if(this.view)
        {
            /* this.view.updateViewCallback(this); */
        }
    }
}