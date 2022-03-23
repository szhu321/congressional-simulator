import Phaser from "phaser";
import UpgradeModel from "../models/UpgradeModel";

export default class UpgradeView extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        this.fontSize = 18;
        this.maxHeight = 100;
        this.maxWidth = 300;
        this.textAmount = 3;
        this.buttonColor = 0xf7e9c3;
        this.buttonColorDark = 0xaba187;
    }

    initialize(){
        let rect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        this.add(rect);
        this.background = rect;
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
        // let combinedText = textArray.join("\r\n");

        children[0].setSize(this.maxWidth, this.maxHeight);
        children[0].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Upgrade Name
        children[1].setPosition(0, -1 * this.maxHeight / 2);
        children[1].setOrigin(0.5, 0);
        children[1].setWordWrapWidth(this.maxWidth, true).setAlign('center');
        children[1].setFontStyle('bold');

        // Upgrade Cost
        children[2].setPosition(0, children[1].height - this.maxHeight / 2);
        children[2].setOrigin(0.5, 0);

        // Upgrade Description
        children[3].setPosition(0, children[1].height + children[2].height - this.maxHeight / 2);
        children[3].setWordWrapWidth(this.maxWidth, true).setAlign('center');
        children[3].setOrigin(0.5, 0);
    }

    /**
     * 
     * @param {UpgradeModel} model 
     */
    updateViewCallback(model){
        let children = this.getAll();

        children[1].setText(model.getName());
        children[2].setText(`$${model.getCost().toFixed(2)}`);
        children[3].setText(model.getDescription());
    }

    setCanPurchase(canPurchase){
        if(canPurchase){
            this.setInteractive();
            this.getAll()[0].setFillStyle(this.buttonColor);
        }else{
            this.disableInteractive();
            this.getAll()[0].setFillStyle(this.buttonColorDark);
        }
    }
}