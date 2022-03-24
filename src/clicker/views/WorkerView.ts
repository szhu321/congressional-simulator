import "phaser";
import WorkerModel from "../models/WorkerModel";
import ClickerButton from "./ClickerButton";

export default class WorkerView extends ClickerButton{
    constructor(scene: Phaser.Scene){
        super(scene);
        this.textAmount = 3;
    }

    updateDisplay(){
        let children = this.getAll();

        this.background.setSize(this.maxWidth, this.maxHeight);
        this.background.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Worker Name
        let workerName = children[1] as Phaser.GameObjects.Text;
        workerName.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);
        workerName.setWordWrapWidth(this.maxWidth / 2, true).setAlign('center');

        // Worker Hired Amount
        let workerAmount = children[2] as Phaser.GameObjects.Text;
        workerAmount.setPosition(0, -1 * this.maxHeight / 2);
        
        // Worker Cost
        let workerCost = children[3] as Phaser.GameObjects.Text;
        workerCost.setPosition(0, workerAmount.height - this.maxHeight / 2);
        workerCost.setWordWrapWidth(this.maxWidth / 2, true).setAlign('center');
    }

    updateViewCallback(model: WorkerModel){
        let children = this.getAll();
        let workerName = children[1] as Phaser.GameObjects.Text;
        let workerAmount = children[2] as Phaser.GameObjects.Text;
        let workerCost = children[3] as Phaser.GameObjects.Text;

        workerName.setText(model.getName());
        workerAmount.setText("Hired: " + model.getAmount());
        workerCost.setText("Cost: $" + model.getCost().toFixed(2));
    }
}