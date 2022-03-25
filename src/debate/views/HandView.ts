import "phaser";
import DeckModel from "../models/DeckModel";
import CardView from "./CardView";

export default class HandView extends Phaser.GameObjects.Container{
    private cardsView: CardView[];

    constructor(scene: Phaser.Scene){
        super(scene);
        this.cardsView = [];
    }

    repositionCards = (dropZoneCards: CardView[], x: number, y: number, sign: number) => {
        for(let i = 0; i < dropZoneCards.length; i++){
            dropZoneCards[i].setX(x + sign * 150 * i);
            dropZoneCards[i].setY(y);
            console.log(dropZoneCards[i].x + ", " + dropZoneCards[i].y)
        }
    }

    /**
     * Update deck display based on model information
     * @param {DeckModel} model 
     */
    updateViewCallback(model: DeckModel){
        for(let card of this.cardsView){
            this.remove(card);
            card.setVisible(false);
        }
        this.cardsView.splice(0, this.cardsView.length);
        let cards = model.getCards();
        for(let card of cards){
            this.cardsView.push(card.getView());
            this.add(card.getView());
            card.getView().setVisible(true);
            this.scene.children.bringToTop(card.getView());
        }
        
        this.repositionCards(this.cardsView, 0, 0, 1);
    }
}