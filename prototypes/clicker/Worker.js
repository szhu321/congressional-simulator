export default class Worker{
    constructor(name, revenueRate, cost){
        this.name = name;
        this.amount = 0;
        this.cost = cost;
        this.revenueRate = revenueRate;
    }

    setRevenueRate(newRevenueRate){
        this.revenueRate = newRevenueRate;
    }

    addWorker(){
        this.amount++;
        this.cost = Math.round(this.cost * 1.1 * 100) / 100;
    }
}