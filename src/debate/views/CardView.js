import CardModel from "../models/CardModel";
import Phaser from "phaser";

export default class CardView extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        // this.maxLines = 7;
        // this.vgap = 10;
        this.fontSize = 15;
        this.abilityFontSize = 12;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 6;
        this.cardColor = 0xf7e9c3;
        this.cardColorDark = 0xaba187;
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

    updateDisplay(textArray, frontFacing){
        let children = this.getAll();
        // let combinedText = textArray.join("\r\n");

        children[0].setSize(this.maxWidth, this.maxHeight);
        children[0].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        if(frontFacing){
            for(let i = 0; i < this.textAmount; i++){
                children[i + 1].setText(textArray[i]);
            }
            // Card Level
            children[1].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

            // Card Cost
            children[2].setPosition(this.maxWidth / 2, -1 * this.maxHeight / 2);
            children[2].setOrigin(1, 0);

            // Card Name
            children[3].setOrigin(0.5, 0);
            children[3].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[3].setPosition(0, children[1].height - this.maxHeight / 2);
            children[3].setFontStyle('bold');

            // Card Ability
            children[4].setOrigin(0.5, 0);
            children[4].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[4].setPosition(0, children[3].height + children[1].height - this.maxHeight / 2);
            children[4].setFontSize(this.abilityFontSize);

            // Card Attack
            children[5].setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
            children[5].setOrigin(0, 1);

            // Or Card Image
            children[7].setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
            children[7].setOrigin(0,1);

            // Card Health
            children[6].setPosition(this.maxWidth / 2, this.maxHeight / 2);
            children[6].setOrigin(1, 1);
        }else{
            children[1].setText("Congrssional Simulator");
            children[1].setOrigin(0.5, 0.5);
            children[1].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[1].setFontStyle('bold');

            children[2].setText(textArray[0]);
            children[2].setPosition(0, this.maxHeight / 2);
            children[2].setOrigin(0.5, 1);
        }
    }

    /**
     * Update card display based on model information
     * @param {CardModel} model 
     */
    updateViewCallback(model){
        let children = this.getAll();
        let level = model.getStar();
        let levelStr = "";
        for(let i = 0; i < level; i++){
            levelStr += "\u{2605}";
        }
        children[1].setText(levelStr);
        children[2].setText(model.getCost());
        if(model.isWorker){
            children[3].setText(model.getName());
            children[7].setTexture(model.getIsAttacking() ? 'sword' : 'shield');
        }else{
            children[3].setText(model.getPoliticalIssue() + " " + model.getPoliticalView());
            children[4].setText(model.getAbility());
            children[5].setText(model.getAttack());
            children[7].setVisible(false);
        }
        children[6].setText(model.getHealth());
        if(model.actionCount > 0){
            this.background.setFillStyle(this.cardColor);
            this.setInteractive();
        }
        else
            this.background.setFillStyle(this.cardColorDark);
    }
}