import Worker from "./Worker.js";
import Upgrade from "./Upgrade.js";

export default class ClickerModel{
    constructor(){
        this.currentFunds = 0;
        this.revenueRate = 0;
        this.clickRevenue = 1;
        this.view = null;
        this.workers = [];
        this.upgrades = [];
    }

    setView(initView){
        this.view = initView;
    }

    setWorkers(clickerData){
        let coldCaller = new Worker("cold_caller", 0.1 / 60, 10);
        let leafleter = new Worker("leafleter", 1 / 60, 30);
        this.workers.push(coldCaller);
        this.workers.push(leafleter);
        let coldCallerUpgrade = new Upgrade("office_equipment", 2, 250);
        let leafleterUpgrade = new Upgrade("demographic_targeting", 2, 500);
        this.upgrades.push(coldCallerUpgrade);
        this.upgrades.push(leafleterUpgrade);
    }

    purchaseWorker(workerIndex){
        let worker = this.workers[workerIndex];
        this.currentFunds -= worker.cost;
        worker.addWorker();
        this.checkWorkerCosts();
        this.view.updateWorkerStatId(workerIndex, worker.amount, worker.cost);
        this.updateRevenueRate();
    }

    updateCurrentFunds = () => {
        this.currentFunds += this.revenueRate;
        this.checkWorkerCosts();
        this.view.updateCurrentFundsDisplay(this.currentFunds);
    }
          
    clickCallText(){
        this.currentFunds += this.clickRevenue;
        this.checkWorkerCosts();
        this.view.updateCurrentFundsDisplay(this.currentFunds);
    }

    checkWorkerCosts(){
        let enableWorkerArray = [];
        this.workers.forEach((element) => {
            enableWorkerArray.push(!(this.currentFunds >= element.cost));
        });
        let enableUpgradeArray = [];
        this.upgrades.forEach((element) => {
            enableUpgradeArray.push(!(this.currentFunds >= element.cost));
        })
        this.view.updateWorkerButtons(enableWorkerArray, enableUpgradeArray);
    }

    applyUpgrade(workerIndex, upgradeId){
        let worker = this.workers[workerIndex];
        worker.setRevenueRate(worker.revenueRate * this.upgrades[workerIndex].multiplier);
        this.updateRevenueRate();
        this.view.removeUpgrade(upgradeId);
    }

    updateRevenueRate(){
        let newRevenueRate = 0;
        this.workers.forEach((element) => {
            newRevenueRate += element.amount * element.revenueRate;
        })
        this.revenueRate = newRevenueRate;
        this.view.updateRevenueRateDisplay(this.revenueRate * 60);
    }
}