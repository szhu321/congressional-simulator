import WorkerModel from "./WorkerModel";
import UpgradeModel from "./UpgradeModel";
import PlayerData from "../../data/PlayerData"
import ClickerView from "../views/ClickerView";

export default class ClickerModel{
    private revenueRate: number;
    private clickRevenue: number;
    private view: ClickerView;
    private workers: WorkerModel[];
    private upgrades: UpgradeModel[];

    constructor(){
        this.revenueRate = 0;
        this.clickRevenue = 1;
        this.view = null;
        this.workers = [];
        this.upgrades = [];
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
        PlayerData.getPlayer().addMoney(-1 * worker.getCost());
        worker.addWorker();
        this.updateRevenueRate();
        this.updateView();
    }

    updateCurrentFunds = (deltaT: number) => {
        PlayerData.getPlayer().addMoney(this.revenueRate * (deltaT / 1000));
        this.updateView();
    }
          
    clickCallText(){
        PlayerData.getPlayer().addMoney(this.clickRevenue);
        this.updateView();
    }

    applyUpgrade(upgradeIndex: number){
        PlayerData.getPlayer().addMoney(-1 * this.upgrades[upgradeIndex].getCost());
        if(this.upgrades[upgradeIndex].getTarget() == 0){
            this.clickRevenue *= this.upgrades[upgradeIndex].getMultiplier();
            this.updateView();
        }else{
            let worker = this.workers[this.upgrades[upgradeIndex].getTarget() - 1];
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