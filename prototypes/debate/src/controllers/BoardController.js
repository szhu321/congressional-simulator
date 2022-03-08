import BoardModel from "../models/BoardModel";

export default class BoardController
{
    model;

    /**
     * @param {BoardModel} model - the model of the deck, if left empty it will create a new model.
     */
    constructor(model)
    {
        if(model)
            this.model = model;
        else
            this.model = new BoardModel();
    }


    //function to move a card from player1's hand to player1's board.


    //function to move a card from player2's hand to player2's board.


    //clicked on next turn.


    //draw a card for player1.


    //draw a card for player2.


    //player1 card attack player2.


    //player2 card attack player1 card.


    //player1 card attack opponent.


    //player2 card attack us.
}