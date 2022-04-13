import UpgradeView from "../views/UpgradeView";

export default class UpgradeModel{
    private name: string;
    private multiplier: number;
    private cost: number;
    private description: string;
    private target: number;
    private view: UpgradeView;
    private isUnlocked: boolean;

    constructor(name: string, multiplier: number, cost: number, description: string, target: number){
        this.name = name;
        this.multiplier = multiplier;
        this.cost = cost;
        this.description = description;
        this.target = target;
        this.view = null;
        this.isUnlocked = false;
    }

    setView(view: UpgradeView){
        this.view = view;
    }

    getView(){
        return this.view;
    }

    getName(){
        return this.name;
    }

    getMultiplier(){
        return this.multiplier;
    }

    getCost(){
        return this.cost;
    }

    getDescription(){
        return this.description;
    }

    getTarget(){
        return this.target;
    }

    getIsUnlocked(){
        return this.isUnlocked;
    }

    unlockPurchase(){
        this.isUnlocked = true;
    }

    updateView()
    {
        if(this.view){
            this.view.updateViewCallback(this);
        }
    }
}