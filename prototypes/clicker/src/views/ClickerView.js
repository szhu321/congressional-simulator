import Phaser from "phaser";
import ClickerModel from "../models/ClickerModel";

export default class ClickerView extends Phaser.GameObjects.Layer{
    constructor(scene){
        super(scene);
        this.controller = null;
        this.workerStatIds = [];
        this.workerButtonIds = [];
        this.upgradeButtonIds = [];
    }

    setController(initController){
        this.controller = initController;
    }

    /**
     * 
     * @param {ClickerModel} model 
     */
    initialize(model){
        let statsText = this.scene.add.text(75, 50, [`Stats`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let currentFundsText = this.scene.add.text(75, 150, [`Current Funds: $${model.getCurrentFunds().toFixed(2)}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let rateOfRevenueText = this.scene.add.text(75, 250, [`Automated Rate of Revenue: $${model.getRevenueRate().toFixed(2)}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let clickCallText = this.scene.add.text(75, 350, [`Text/Call`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({useHandCursor: true});
        let workersText = this.scene.add.text(575, 50, [`Workers`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let upgradesText = this.scene.add.text(1025, 50, [`Upgrades`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');

        clickCallText.on('pointerover', () => {
            this.getChildren()[3].setColor('#ff69b4');
        })

        clickCallText.on('pointerout', () => {
            this.getChildren()[3].setColor('#00ffff');
        })

        clickCallText.on('pointerup', () => {
            console.log("call");
            this.controller.processClickCallText();
        })

        this.add(statsText);
        this.add(currentFundsText);
        this.add(rateOfRevenueText);
        this.add(clickCallText);
        this.add(workersText);
        this.add(upgradesText);

        let workers = model.getWorkers();
        console.log(workers);
        for(let i = 0; i < workers.length; i++){
            let workerView = workers[i].getView();
            console.log(workerView);
            workerView.setPosition(625, 150 + 110 * i);
            workerView.setInteractive({useHandCursor: true});
            this.add(workerView);
        }

        let upgrades = model.getUpgrades();
        for(let i = 0; i < upgrades.length; i++){
            let upgradeView = upgrades[i].getView();
            upgradeView.setPosition(1075, 150 + 110 * i);
            upgradeView.setInteractive({useHandCursor: true});
            this.add(upgradeView);
        }

        this.scene.input.on('gameobjectup', (pointer, gameObject, event) => {
            console.log(gameObject);
        })
    }

    /**
     * 
     * @param {ClickerModel} model 
     */
    updateViewCallback(model){
        let children = this.getAll();
        children[1].setText(`Current Funds: $${model.getCurrentFunds().toFixed(2)}`);
        children[2].setText(`Automated Rate of Revenue: $${model.getRevenueRate().toFixed(2)}`);
    }

    setGUIIds(){
        this.workerStatIds.push("cold_caller_stats");
        this.workerStatIds.push("leafleter_stats");
        this.workerButtonIds.push("cold_caller_button");
        this.workerButtonIds.push("leafleter_button");
        this.upgradeButtonIds.push("cold_caller_upgrade_button");
        this.upgradeButtonIds.push("leafleter_upgrade_button");
    }

    updateWorkerStatId(workerIndex, newAmount, newCost){
        document.getElementById(this.workerStatIds[workerIndex]).innerHTML = "Hired: " + newAmount + "<br>Cost: $" + newCost.toFixed(2);
    }

    updateCurrentFundsDisplay(newFunds){
        document.getElementById("current_funds").innerHTML = "Current Funds: $" + newFunds.toFixed(2);
    }

    updateRevenueRateDisplay(newRevenueRate){
        document.getElementById("rate_of_revenue").innerHTML = "Automated Rate of Revenue: $" + newRevenueRate.toFixed(2) + "/sec";
    }

    updateWorkerButtons(enableWorkerArray, enableUpgradeArray){
        for(let i = 0; i < this.workerButtonIds.length; i++){
            document.getElementById(this.workerButtonIds[i]).disabled = enableWorkerArray[i];
            let upgrade = document.getElementById(this.upgradeButtonIds[i]);
            if(upgrade){
                upgrade.disabled = enableUpgradeArray[i];
            }
        }
    }

    removeUpgrade(upgradeId){
        document.getElementById(upgradeId).remove();
    }
}