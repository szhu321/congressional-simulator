import DeckModel from "../models/DeckModel";
import "phaser";

export default class DeckView extends Phaser.GameObjects.Container{
    private fontSize: number;
    private maxHeight: number;
    private maxWidth: number;
    private textAmount: number;
    private cardColor: number;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.fontSize = 15;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 2;
        this.cardColor = 0xf7e9c3;
    }

    getMaxHeight(){
        return this.maxHeight;
    }

    getMaxWidth(){
        return this.maxWidth;
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

    updateDisplay(){
        let children = this.getAll();

        let background = children[0] as Phaser.GameObjects.Rectangle;
        background.setSize(this.maxWidth, this.maxHeight);
        background.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Card Brand Name
        let cardBrand = children[1] as Phaser.GameObjects.Text;
        cardBrand.setText("Congrssional Simulator");
        cardBrand.setOrigin(0.5, 0.5);
        cardBrand.setWordWrapWidth(this.maxWidth, true).setAlign('center');
        cardBrand.setFontStyle('bold');

        // Card Number
        let cardNumber = children[2] as Phaser.GameObjects.Text;
        cardNumber.setText("");
        cardNumber.setPosition(0, this.maxHeight / 2);
        cardNumber.setOrigin(0.5, 1);
    }

    /**
     * Update deck display based on model information
     * @param {DeckModel} model 
     */
    updateViewCallback(model: DeckModel){
        let children = this.getAll();
        let cardNumber = children[2] as Phaser.GameObjects.Text;
        cardNumber.setText(model.getCardCount().toString());
    }
}