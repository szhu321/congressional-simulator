import "phaser";
import ClickerController from "../controllers/ClickerController";
import ClickerModel from "../models/ClickerModel";
import UpgradeView from "./UpgradeView";
import WorkerView from "./WorkerView";

export default class ClickerView extends Phaser.GameObjects.Layer{
    private controller: ClickerController;
    private workerViews: WorkerView[];
    private upgradeViews: UpgradeView[];

    constructor(scene: Phaser.Scene){
        super(scene);
        this.controller = null;
        this.workerViews = [];
        this.upgradeViews = [];
    }

    setController(initController: ClickerController){
        this.controller = initController;
    }

    initialize(model: ClickerModel){
        let statsText = this.scene.add.text(75, 50, [`Stats`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let currentFundsText = this.scene.add.text(75, 150, [`Current Funds: $${model.getCurrentFunds().toFixed(2)}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let rateOfRevenueText = this.scene.add.text(75, 250, [`Automated Rate of Revenue: $${model.getRevenueRate().toFixed(2)}/sec`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let clickCallText = this.scene.add.text(75, 350, [`Text/Call`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive({useHandCursor: true});
        let workersText = this.scene.add.text(575, 50, [`Workers`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let upgradesText = this.scene.add.text(1025, 50, [`Upgrades`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');

        clickCallText.on('pointerover', () => {
            clickCallText.setColor('#ff69b4');
        })

        clickCallText.on('pointerout', () => {
            clickCallText.setColor('#00ffff');
        })

        clickCallText.on('pointerup', () => {
            this.controller.processClickCallText();
        })

        this.add(statsText);
        this.add(currentFundsText);
        this.add(rateOfRevenueText);
        this.add(clickCallText);
        this.add(workersText);
        this.add(upgradesText);

        let workers = model.getWorkers();
        for(let i = 0; i < workers.length; i++){
            let workerView = workers[i].getView();
            workerView.setPosition(625, 150 + 110 * i);
            workerView.setCanPurchase(model.getCurrentFunds() >= workers[i].getCost());
            workerView.on('pointerup', (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
                this.controller.processPurchaseWorker(i);
            });
            this.add(workerView);
            this.workerViews.push(workerView);
        }

        let upgrades = model.getUpgrades();
        for(let i = 0; i < upgrades.length; i++){
            let upgradeView = upgrades[i].getView();
            upgradeView.setPosition(1075, 150 + 110 * i);
            upgradeView.setCanPurchase(model.getCurrentFunds() >= upgrades[i].getCost());
            upgradeView.on('pointerup', (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
                this.controller.processPurchaseUpgrade(upgrades.map(upgrade => upgrade.getView()).indexOf(upgradeView));
            })
            this.add(upgradeView);
            this.upgradeViews.push(upgradeView);
        }
    }

    updateViewCallback(model: ClickerModel){
        let children = this.getAll();
        let currentFundsText = children[1] as Phaser.GameObjects.Text;
        currentFundsText.setText(`Current Funds: $${model.getCurrentFunds().toFixed(2)}`);
        
        let rateOfRevenueText = children[2] as Phaser.GameObjects.Text;
        rateOfRevenueText.setText(`Automated Rate of Revenue: $${model.getRevenueRate().toFixed(2)}/sec`);

        let workers = model.getWorkers();
        for(let i = 0; i < workers.length; i++){
            this.workerViews[i].setCanPurchase(model.getCurrentFunds() >= workers[i].getCost());
        }

        for(let i = 0; i < this.upgradeViews.length; i++){
            this.remove(this.upgradeViews[i]);
        }
        this.upgradeViews.splice(0, this.upgradeViews.length);

        let upgrades = model.getUpgrades();
        for(let i = 0; i < upgrades.length; i++){
            let upgradeView = upgrades[i].getView();
            upgradeView.setPosition(1075, 150 + 110 * i);
            this.add(upgradeView);
            this.upgradeViews.push(upgradeView);
            upgradeView.setCanPurchase(model.getCurrentFunds() >= upgrades[i].getCost());
        }
    }
}