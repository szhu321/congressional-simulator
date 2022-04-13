import FundraiseModel from "../models/FundraiseModel";

export default class FundraiseController{
    private model: FundraiseModel;

    constructor(){
        this.model = null;
    }

    setModel(initModel: FundraiseModel){
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

    processWorkerNextPage = () => {
        this.model.changeWorkerPage(1);
    }

    processWorkerPrevPage = () => {
        this.model.changeWorkerPage(-1);
    }

    processUpgradeNextPage = () => {
        this.model.changeUpgradePage(1);
    }

    processUpgradePrevPage = () => {
        this.model.changeUpgradePage(-1);
    }
}