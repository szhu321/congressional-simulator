export default class UpgradeModel{
    constructor(name, multiplier, cost, description){
        this.name = name;
        this.cost = cost;
        this.multiplier = multiplier;
        this.description = description;
        this.view = null;
    }

    setView(view){
        this.view = view;
    }

    getView(){
        return this.view;
    }

    getName(){
        return this.name;
    }

    getCost(){
        return this.cost;
    }

    getDescription(){
        return this.description;
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}