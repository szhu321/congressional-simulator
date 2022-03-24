import WorkerModel from "./WorkerModel";
import UpgradeModel from "./UpgradeModel";
import PlayerData from "../../data/PlayerData.js"
import ClickerView from "../views/ClickerView";

export default class ClickerModel{
    private currentFunds: number;
    private revenueRate: number;
    private clickRevenue: number;
    private view: ClickerView;
    private workers: WorkerModel[];
    private upgrades: UpgradeModel[];

    constructor(){
        this.currentFunds = 0;
        this.revenueRate = 0;
        this.clickRevenue = 1;
        this.view = null;
        this.workers = [];
        this.upgrades = [];
    }

    getCurrentFunds(){
        return this.currentFunds;
    }

    getRevenueRate(){
        return this.revenueRate;
    }

    setView(initView: ClickerView){
        this.view = initView;
    }

    getWorkers(){
        return this.workers;
    }

    getUpgrades(){
        return this.upgrades;
    }

    addWorker(worker: WorkerModel){
        this.workers.push(worker);
    }

    addUpgrade(upgrade: UpgradeModel){
        this.upgrades.push(upgrade);
    }

    purchaseWorker(workerIndex: number){
        let worker = this.workers[workerIndex];
        this.currentFunds -= worker.getCost();
        PlayerData.getPlayer().setConfig({money: this.currentFunds});
        worker.addWorker();
        this.updateRevenueRate();
        this.updateView();
    }

    updateCurrentFunds = (deltaT: number) => {
        this.currentFunds += this.revenueRate * (deltaT / 1000);
        PlayerData.getPlayer().setConfig({money: this.currentFunds});
        this.updateView();
    }
          
    clickCallText(){
        this.currentFunds += this.clickRevenue;
        PlayerData.getPlayer().setConfig({money: this.currentFunds});
        this.updateView();
    }

    applyUpgrade(upgradeIndex: number){
        if(this.upgrades[upgradeIndex].getTarget() == 0){

        }else{
            let worker = this.workers[this.upgrades[upgradeIndex].getTarget() - 1];
            this.currentFunds -= this.upgrades[upgradeIndex].getCost();
            PlayerData.getPlayer().setConfig({money: this.currentFunds});
            worker.setRevenueRate(worker.getRevenueRate() * this.upgrades[upgradeIndex].getMultiplier());
            this.updateRevenueRate();
            this.upgrades.splice(upgradeIndex, 1);
            this.updateView();
        }
    }

    updateRevenueRate(){
        let newRevenueRate = 0;
        this.workers.forEach((element) => {
            newRevenueRate += element.getAmount() * element.getRevenueRate();
        })
        this.revenueRate = newRevenueRate;
    }

    updateView()
    {
        if(this.view){
            this.view.updateViewCallback(this);
        }
    }
}