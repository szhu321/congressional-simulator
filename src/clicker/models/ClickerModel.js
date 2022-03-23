import WorkerModel from "./WorkerModel.js";
import UpgradeModel from "./UpgradeModel.js";

export default class ClickerModel{
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

    setView(initView){
        this.view = initView;
    }

    // setWorkersAndUpgrades(clickerData){

    //     for(let i = 0; i < clickerData.workers.length; i++){

    //         let newWorker = clickerData.workers[i];
    //         let newWorkerModel = new WorkerModel(newWorker.name, newWorker.revenueRate / 60, newWorker.cost);
    //         this.workers.push(newWorkerModel);
    //     }

    //     for(let i = 0; i < clickerData.upgrades.length; i++){

    //     }
    // }

    getWorkers(){
        return this.workers;
    }

    getUpgrades(){
        return this.upgrades;
    }

    addWorker(worker){
        this.workers.push(worker);
    }

    addUpgrade(upgrade){
        this.upgrades.push(upgrade);
    }

    purchaseWorker(workerIndex){
        let worker = this.workers[workerIndex];
        this.currentFunds -= worker.cost;
        worker.addWorker();
        this.updateRevenueRate();
        this.updateView();
    }

    updateCurrentFunds = () => {
        this.currentFunds += this.revenueRate;
        // this.checkWorkerCosts();
        // this.view.updateCurrentFundsDisplay(this.currentFunds);
        this.updateView();
    }
          
    clickCallText(){
        this.currentFunds += this.clickRevenue;
        //this.checkWorkerCosts();
        this.updateView();
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

    applyUpgrade(upgradeIndex){
        // let worker = this.workers[workerIndex];
        // worker.setRevenueRate(worker.revenueRate * this.upgrades[workerIndex].multiplier);
        // this.updateRevenueRate();
        // this.view.removeUpgrade(upgradeId);
        if(this.upgrades[upgradeIndex].target == 0){

        }else{
            // console.log(this.upgrades[upgradeIndex].target - 1);
            let worker = this.workers[this.upgrades[upgradeIndex].target - 1];
            this.currentFunds -= this.upgrades[upgradeIndex].cost;
            worker.setRevenueRate(worker.revenueRate * this.upgrades[upgradeIndex].multiplier);
            this.updateRevenueRate();
            this.upgrades.splice(upgradeIndex, 1);
            this.updateView();
        }
    }

    updateRevenueRate(){
        let newRevenueRate = 0;
        this.workers.forEach((element) => {
            // console.log(element.amount + ", " + element.revenueRate);
            newRevenueRate += element.amount * element.revenueRate;
        })
        this.revenueRate = newRevenueRate;
        // this.view.updateRevenueRateDisplay(this.revenueRate * 60);
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}