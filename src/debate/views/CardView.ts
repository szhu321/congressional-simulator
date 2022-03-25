import CardModel from "../models/CardModel";
import Phaser from "phaser";

export default class CardView extends Phaser.GameObjects.Container{
    private fontSize: number;
    private abilityFontSize: number;
    private maxHeight: number;
    private maxWidth: number;
    private textAmount: number;
    private cardColor: number;
    private cardColorDark: number;
    private background: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.fontSize = 15;
        this.abilityFontSize = 12;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 6;
        this.cardColor = 0xf7e9c3;
        this.cardColorDark = 0xaba187;
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
        this.background = rect;
        for(let i = 0; i < this.textAmount; i++){
            let text = this.scene.add.text(0, 0, "", {});
            text.setFontSize(this.fontSize);
            text.setColor("black")
            this.add(text);
        }
        let image = this.scene.add.image(0, 0, '');
        this.add(image);
        this.setDataEnabled();
        this.setData({dropZoneName : "", dropZoneX: 0, dropZoneY: 0, cost: 100});
    }

    updateDisplay(textArray: string[], frontFacing: boolean){
        let children = this.getAll();
        // let combinedText = textArray.join("\r\n");

        this.background.setSize(this.maxWidth, this.maxHeight);
        this.background.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        if(frontFacing){
            for(let i = 0; i < this.textAmount; i++){
                let text = children[i + 1] as Phaser.GameObjects.Text;
                text.setText(textArray[i]);
            }
            // Card Level
            let cardLevel = children[1] as Phaser.GameObjects.Text;
            cardLevel.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

            // Card Cost
            let cardCost = children[2] as Phaser.GameObjects.Text;
            cardCost.setPosition(this.maxWidth / 2, -1 * this.maxHeight / 2);
            cardCost.setOrigin(1, 0);

            // Card Name
            let cardName = children[3] as Phaser.GameObjects.Text;
            cardName.setOrigin(0.5, 0);
            cardName.setWordWrapWidth(this.maxWidth, true).setAlign('center');
            cardName.setPosition(0, cardLevel.height - this.maxHeight / 2);
            cardName.setFontStyle('bold');

            // Card Ability
            let cardAbility = children[4] as Phaser.GameObjects.Text;
            cardAbility.setOrigin(0.5, 0);
            cardAbility.setWordWrapWidth(this.maxWidth, true).setAlign('center');
            cardAbility.setPosition(0, cardName.height + cardLevel.height - this.maxHeight / 2);
            cardAbility.setFontSize(this.abilityFontSize);

            // Card Attack
            let cardAttack = children[5] as Phaser.GameObjects.Text;
            cardAttack.setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
            cardAttack.setOrigin(0, 1);

            // Or Card Image
            let cardImage = children[7] as Phaser.GameObjects.Image;
            cardImage.setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
            cardImage.setOrigin(0,1);

            // Card Health
            let cardHealth = children[6] as Phaser.GameObjects.Text;
            cardHealth.setPosition(this.maxWidth / 2, this.maxHeight / 2);
            cardHealth.setOrigin(1, 1);
        }else{
            let cardBrand = children[1] as Phaser.GameObjects.Text;
            cardBrand.setText("Congrssional Simulator");
            cardBrand.setOrigin(0.5, 0.5);
            cardBrand.setWordWrapWidth(this.maxWidth, true).setAlign('center');
            cardBrand.setFontStyle('bold');

            // let deckSize = children[2] as Phaser.GameObjects.Text;
            // deckSize.setText(textArray[0]);
            // deckSize.setPosition(0, this.maxHeight / 2);
            // deckSize.setOrigin(0.5, 1);
        }
    }

    /**
     * Update card display based on model information
     * @param {CardModel} model 
     */
    updateViewCallback(model: CardModel){
        let children = this.getAll();
        let level = model.getStar();
        let levelStr = "";
        for(let i = 0; i < level; i++){
            levelStr += "\u{2605}";
        }

        let cardLevel = children[1] as Phaser.GameObjects.Text;
        cardLevel.setText(levelStr);
        let cardCost = children[2] as Phaser.GameObjects.Text;
        cardCost.setText(model.getCost().toString());
        if(model.getIsWorker()){
            let cardName = children[3] as Phaser.GameObjects.Text;
            cardName.setText(model.getName());
            let cardImage = children[7] as Phaser.GameObjects.Image;
            cardImage.setTexture(model.getIsAttacking() ? 'sword' : 'shield');
        }else{
            let cardName = children[3] as Phaser.GameObjects.Text;
            cardName.setText(model.getPoliticalIssue() + " " + model.getPoliticalView());
            let cardAbility = children[4] as Phaser.GameObjects.Text;
            cardAbility.setText(model.getAbility());
            let cardAttack = children[5] as Phaser.GameObjects.Text;
            cardAttack.setText(model.getAttack().toString());
            let cardImage = children[7] as Phaser.GameObjects.Image;
            cardImage.setVisible(false);
        }
        let cardHealth = children[6] as Phaser.GameObjects.Text;
        cardHealth.setText(model.getHealth().toString());
        if(model.hasAction()){
            this.background.setFillStyle(this.cardColor);
            this.setInteractive();
        }
        else
            this.background.setFillStyle(this.cardColorDark);
    }
}