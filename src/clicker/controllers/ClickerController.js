export default class ClickerController{
    constructor(){
        this.model = null;
        this.frameRate = 1000/60;
        this.totalTimePassed = 0;
    }

    setModel(initModel){
        this.model = initModel;
    }

    // registerClickerEventHandlers(){
    //     document.getElementById("call_button").addEventListener("click", this.processClickCallText);
    //     document.getElementById("cold_caller_button").addEventListener("click", () => this.processPurchaseWorker(0));
    //     document.getElementById("leafleter_button").addEventListener("click", () => this.processPurchaseWorker(1));
    //     document.getElementById("cold_caller_upgrade_button").addEventListener("click", () => this.processPurchaseUpgrade(0, "cold_caller_upgrade"));
    //     document.getElementById("leafleter_upgrade_button").addEventListener("click", () => this.processPurchaseUpgrade(1, "leafleter_upgrade"));

    //     setInterval(this.model.updateCurrentFunds, 1000/60);
    // }

    startAutomatedRevenue(){
        setInterval(this.model.updateCurrentFunds, 1000/60);
    }

    passTime(deltaT){
        // this.totalTimePassed += deltaT;
        // if(this.totalTimePassed >= this.frameRate){
        //     this.model.updateCurrentFunds();
        //     this.totalTimePassed -= this.frameRate;
        // }
        this.model.updateCurrentFunds(deltaT);
    }

    processClickCallText = () => {
        this.model.clickCallText();
    }

    processPurchaseWorker = (workerIndex) => {
        this.model.purchaseWorker(workerIndex);
    }

    processPurchaseUpgrade = (upgradeIndex) => {
        this.model.applyUpgrade(upgradeIndex);
    }

    test = (value) => {
        console.log(value);
    }
}