export default class WorkerModel{
    constructor(name, revenueRate, cost){
        this.name = name;
        this.amount = 0;
        this.cost = cost;
        this.revenueRate = revenueRate;
        this.view = null;
    }

    setRevenueRate(newRevenueRate){
        this.revenueRate = newRevenueRate;
    }

    setView(view){
        this.view = view;
    }

    getView(){
        return this.view;
    }

    addWorker(){
        this.amount++;
        this.cost = Math.round(this.cost * 1.1 * 100) / 100;
        this.updateView();
    }

    getName(){
        return this.name;
    }

    getAmount(){
        return this.amount;
    }

    getCost(){
        return this.cost;
    }

    getRevenueRate(){
        return this.revenueRate;
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}