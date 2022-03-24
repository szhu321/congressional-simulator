import ClickerModel from "../models/ClickerModel";

export default class ClickerController{
    private model: ClickerModel;

    constructor(){
        this.model = null;
    }

    setModel(initModel: ClickerModel){
        this.model = initModel;
    }

    startAutomatedRevenue(){
        setInterval(this.model.updateCurrentFunds, 1000/60);
    }

    passTime(deltaT: number){
        this.model.updateCurrentFunds(deltaT);
    }

    processClickCallText = () => {
        this.model.clickCallText();
    }

    processPurchaseWorker = (workerIndex: number) => {
        this.model.purchaseWorker(workerIndex);
    }

    processPurchaseUpgrade = (upgradeIndex: number) => {
        this.model.applyUpgrade(upgradeIndex);
    }
}