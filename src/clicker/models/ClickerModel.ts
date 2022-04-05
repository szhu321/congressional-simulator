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
    private workerPage: number;
    private upgradePage: number;

    constructor(){
        this.revenueRate = 0;
        this.clickRevenue = 1;
        this.view = null;
        this.workers = [];
        this.upgrades = [];
        this.workerPage = 0;
        this.upgradePage = 0;
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

    getWorkerPage(){
        return this.workerPage;
    }

    getUpgradePage(){
        return this.upgradePage;
    }

    purchaseWorker(workerIndex: number){
        let worker = this.workers[workerIndex];
        PlayerData.getPlayer().addMoney(-1 * worker.getCost());
        worker.addWorker();
        this.updateRevenueRate();
        this.unlockWorkersAndUpgrades();
        this.updateView();
    }

    updateCurrentFunds = (deltaT: number) => {
        PlayerData.getPlayer().addMoney(this.revenueRate * (deltaT / 1000));
        this.unlockWorkersAndUpgrades();
        this.updateView();
    }
          
    clickCallText(){
        PlayerData.getPlayer().addMoney(this.clickRevenue);
        this.unlockWorkersAndUpgrades();
        this.updateView();
    }

    applyUpgrade(upgradeIndex: number){
        PlayerData.getPlayer().addMoney(-1 * this.upgrades[upgradeIndex].getCost());
        if(this.upgrades[upgradeIndex].getTarget() == 0){
            this.clickRevenue *= this.upgrades[upgradeIndex].getMultiplier();
        }else{
            let worker = this.workers[this.upgrades[upgradeIndex].getTarget() - 1];
            worker.setRevenueRate(worker.getRevenueRate() * this.upgrades[upgradeIndex].getMultiplier());
            this.updateRevenueRate();
        }
        this.upgrades.splice(upgradeIndex, 1);
        if(this.upgrades.filter(upgrade => upgrade.getIsUnlocked()).length < (this.upgradePage * this.view.getUpgradesPerPage() + 1)){
            this.upgradePage--;
        }
        this.updateView();
    }

    unlockWorkersAndUpgrades(){
        let currentFunds = PlayerData.getPlayer().getMoney();
        for(let i = 0; i < this.workers.length; i++){
            let worker = this.workers[i];
            if(currentFunds >= worker.getCost() && !worker.getIsUnlocked()){
                worker.unlockPurchase();
            }
        }
        for(let i = 0; i < this.upgrades.length; i++){
            let upgrade = this.upgrades[i];
            if(currentFunds >= upgrade.getCost() && !upgrade.getIsUnlocked()){
                if(upgrade.getTarget() == 0){
                    upgrade.unlockPurchase();
                }else{
                    if(this.workers[upgrade.getTarget() - 1].getAmount() > 0){
                        upgrade.unlockPurchase();
                    }
                }
            }
        }
    }

    updateRevenueRate(){
        let newRevenueRate = 0;
        this.workers.forEach((element) => {
            newRevenueRate += element.getAmount() * element.getRevenueRate();
        })
        this.revenueRate = newRevenueRate;
    }

    changeWorkerPage(value: number){
        this.workerPage += value;
        this.updateView();
    }

    changeUpgradePage(value: number){
        this.upgradePage += value;
        this.updateView();
    }

    updateView()
    {
        if(this.view){
            this.view.updateViewCallback(this);
        }
    }
}