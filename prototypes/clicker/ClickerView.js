export default class ClickerView{
    constructor(){
        this.controller = null;
        this.workerStatIds = [];
        this.workerButtonIds = [];
        this.upgradeButtonIds = [];
    }

    setController(initController){
        this.controller = initController;
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