import "phaser";
import UpgradeModel from "../models/UpgradeModel";
import ClickerButton from "./ClickerButton";
import millify from "millify";

export default class UpgradeView extends ClickerButton{
    constructor(scene: Phaser.Scene){
        super(scene);
        this.textAmount = 3;
    }

    updateDisplay(){
        let children = this.getAll();
        
        this.background.setSize(this.maxWidth, this.maxHeight);
        this.background.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Upgrade Name
        let upgradeName = children[1] as Phaser.GameObjects.Text;
        upgradeName.setPosition(0, -1 * this.maxHeight / 2);
        upgradeName.setOrigin(0.5, 0);
        upgradeName.setWordWrapWidth(this.maxWidth, true).setAlign('center');
        upgradeName.setFontStyle('bold');

        // Upgrade Cost
        let upgradeCost = children[2] as Phaser.GameObjects.Text;
        upgradeCost.setPosition(0, upgradeName.height * 2 - this.maxHeight / 2);
        upgradeCost.setOrigin(0.5, 0);

        // Upgrade Description
        let upgradeDescription = children[3] as Phaser.GameObjects.Text;
        upgradeDescription.setPosition(0, upgradeName.height * 2 + upgradeCost.height - this.maxHeight / 2);
        upgradeDescription.setWordWrapWidth(this.maxWidth, true).setAlign('center');
        upgradeDescription.setOrigin(0.5, 0);
    }

    updateViewCallback(model: UpgradeModel){
        let children = this.getAll();
        let upgradeName = children[1] as Phaser.GameObjects.Text;
        let upgradeCost = children[2] as Phaser.GameObjects.Text;
        let upgradeDescription = children[3] as Phaser.GameObjects.Text;

        upgradeName.setText(model.getName());
        upgradeCost.setText(`$${millify(model.getCost(), {
            precision: 5
          })}`);
        upgradeDescription.setText(model.getDescription());
    }
}