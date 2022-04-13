import "phaser";
import WorkerModel from "../models/WorkerModel";
import FundraiseButton from "./FundraiseButton";
import millify from "millify";

export default class WorkerView extends FundraiseButton{
    constructor(scene: Phaser.Scene){
        super(scene);
        this.textAmount = 3;
        this.maxHeight = 60;
    }

    updateDisplay(){
        let children = this.getAll();

        this.background.setSize(this.maxWidth, this.maxHeight);
        this.background.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        // Worker Name
        let workerName = children[1] as Phaser.GameObjects.Text;
        workerName.setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);
        workerName.setWordWrapWidth(this.maxWidth / 2, true)/*.setAlign('center')*/;
        workerName.setFontStyle('bold');

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

        // let formatter = Intl.NumberFormat('en-US', {
        //     notation: "compact",
        //     maximumFractionDigits: 1
        //   })

        workerName.setText(model.getName());
        workerAmount.setText("Hired: " + model.getAmount());
        let cost = model.getCost();
        let costString = cost < 1000 ? cost.toFixed(2) : millify(cost, {
            precision: 2
          })
        workerCost.setText("Cost: $" + costString);
    }
}