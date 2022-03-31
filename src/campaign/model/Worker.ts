import {CARD_RANK} from "../../gameenums";
import WorkerView from "../view/WorkerView";

export enum BOSS {
    OPPONENT = 'opponent',
    PLAYER = 'player'
}

export default class Worker
{
    private ability: string;
    private name: string;
    private description: string;
    private rank: CARD_RANK;
    private view: WorkerView;
    private actionCount: number;
    private stars: number;

    private dailySalary: number;
    private boss: BOSS;


    constructor()
    {
        this.ability = "";
        this.name = "Unnamed";
        this.description = "";
        this.rank = CARD_RANK.COMMON;//rarity of the card.
        this.view = null;
        this.actionCount = 0;
        this.stars = 1;//number of starts this card has.

        //cost to hire in money per day.
        this.dailySalary = 0;
        this.boss = BOSS.PLAYER;
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    public setConfig(configObject: {
        name: string, ability: string, description: string, rank: CARD_RANK, view: WorkerView,
        actionCount: number, stars: number, dailySalary: number, boss: BOSS
    })
    {
        let {name, ability, description, rank,
             actionCount, stars, dailySalary, boss} = configObject;
        if(name) this.name = name;
        if(ability) this.ability = ability;
        if(description) this.description = description;
        if(rank) this.rank = rank;
        if(actionCount) this.actionCount = actionCount;
        if(stars) this.stars = stars;
        if(dailySalary) this.dailySalary = dailySalary;
        if(boss) this.boss = boss;
        //this.updateDefaults(configObject);
        this.updateView();
    }

    public getDailySalary(): number {return this.dailySalary;}
    public setDailySalary(value: number) {this.dailySalary = value;}
    public getBoss(): BOSS {return this.boss;}
    public setBoss(value: BOSS) {this.boss = value;}

    public getStar()
    {
        return this.stars;
    }

    /**
     * @param {Number} stars - the number of stars this card will be set to.
     */
    public setStars(stars: number)
    {
        this.stars = stars;
    }

    /**
     * 
     * @param {*} actionCount 
     */
    public setAction(actionCount: number)
    {
        this.actionCount = actionCount;
        this.updateView();
    }

    public getName()
    {
        return this.name;
    }

    public setName(name: string)
    {
        this.name = name;
        this.updateView();
    }

    public setDescription(descirption: string)
    {
        this.description = descirption;
        this.updateView(); 
    }

    public getDescription()
    {
        return this.description;
    }

    /**
     * 
     * @param {CARD_RANK} rank - use CARD_RANK enum to provide a rank.
     */
    public setRank(rank: CARD_RANK)
    {
        this.rank = rank;
        this.updateView();
    }

    public getRank()
    {
        return this.rank;
    }

    public setAbility(ability: string)
    {
        this.ability = ability;
        this.updateView();
    }

    public getAbility()
    {
        return this.ability;
    }

    public setView(view: WorkerView)
    {
        this.view = view;
    }

    public updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }

    /**
     * Clones the current worker without the view.
     */
    public cloneNoView(): Worker
    {
        let worker = new Worker();
        worker.setConfig({name: this.name, ability: this.ability, description: this.description, rank: this.rank,
            actionCount: this.actionCount, stars: this.stars, dailySalary: this.dailySalary, boss: this.boss, view: null});
        return worker;
    }
}