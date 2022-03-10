import Phaser from "phaser";
import DeckModel from "../models/DeckModel";

export default class HandView extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        // this.maxLines = 7;
        // this.vgap = 10;
        this.fontSize = 15;
        this.abilityFontSize = 12;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 2;
        this.cardColor = 0xf7e9c3;
        this.cardsView = [];
    }

    initialize(){
        let rect = this.scene.add.rectangle(0, 0, 0, 0, this.cardColor);
        this.add(rect);
        for(let i = 0; i < this.textAmount; i++){
            let text = this.scene.add.text(0, 0, "", {});
            text.setFontSize(this.fontSize);
            text.setColor("black")
            this.add(text);
        }
        this.setDataEnabled();
        this.setData({dropZoneName : "", dropZoneX: 0, dropZoneY: 0, cost: 100});
    }

    updateDisplay(deckSize){
        let children = this.getAll();
        // let combinedText = textArray.join("\r\n");

        children[0].setSize(this.maxWidth, this.maxHeight);
        children[0].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Card Brand Name
        children[1].setText("Congrssional Simulator");
        children[1].setOrigin(0.5, 0.5);
        children[1].setWordWrapWidth(this.maxWidth, true).setAlign('center');
        children[1].setFontStyle('bold');

        // Card Number
        children[2].setText(deckSize);
        children[2].setPosition(0, this.maxHeight / 2);
        children[2].setOrigin(0.5, 1);
        
    }

    repositionCards = (dropZoneCards, x, y, sign) => {
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
    updateViewCallback(model){
        // let children = this.getAll();
        // children[2].setText(model.getCards().length);
        for(let card of this.cardsView){
            this.remove(card);
            card.setVisible(false);
        }
        this.cardsView.splice(0, this.cardsView.length);
        let cards = model.getCards();
        for(let card of cards){
            // console.log(card);
            // console.log(card.view);
            this.cardsView.push(card.view);
            this.add(card.view);
            // this.scene.add.existing(card.view);
            card.view.setVisible(true);
            this.scene.children.bringToTop(card.view);
        }
        
        this.repositionCards(this.cardsView, 0, 0, 1);
        //this.repositionCards(this.cardsView, 0, 0, 1);
        // console.log("HELLO");
        // console.log(model.getCards());
        // console.log(this.cardsView);
    }
}