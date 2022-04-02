import {CARD_RANK} from "../../gameenums";
import { CANDIDATE, WORKER_TYPE } from "../campaignenum";
import WorkerView from "../view/WorkerView";

// export enum BOSS {
//     OPPONENT = 'opponent',
//     PLAYER = 'player'
// }

export default class Worker
{
    private workerType: WORKER_TYPE;
    private ability: string;
    private name: string;
    private description: string;
    private rank: CARD_RANK;
    private view: WorkerView;
    private actionCount: number;
    private stars: number;

    private dailySalary: number;
    private initialCost: number;
    
    /**
     * The employer of this worker.
     */
    private candidate: CANDIDATE;
    private working: boolean;
    private tileRow: number;
    private tileCol: number;
    private persuasivePower: number;
    private influencePower: number;


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

        this.initialCost = 0;
        this.candidate = CANDIDATE.PLAYER;
        this.tileCol = -1;
        this.tileRow = -1;
        this.working = false;
        this.persuasivePower = 1;
        this.influencePower = 1;
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    public setConfig(configObject: {
        name: string, ability: string, description: string, rank: CARD_RANK, view: WorkerView,
        actionCount: number, stars: number, dailySalary: number, candidate: CANDIDATE
    })
    {
        let {name, ability, description, rank,
             actionCount, stars, dailySalary, candidate} = configObject;
        if(name) this.name = name;
        if(ability) this.ability = ability;
        if(description) this.description = description;
        if(rank) this.rank = rank;
        if(actionCount) this.actionCount = actionCount;
        if(stars) this.stars = stars;
        if(dailySalary) this.dailySalary = dailySalary;
        if(candidate) this.candidate = candidate;
        //this.updateDefaults(configObject);
        this.updateView();
    }

    public getDailySalary(): number {return this.dailySalary;}
    public setDailySalary(value: number) {this.dailySalary = value;}
    public getCandidate(): CANDIDATE {return this.candidate;}
    public setCandidate(value: CANDIDATE) {this.candidate = value;}
    public setTileRow(value: number) {this.tileRow = value;}
    public getTileRow(): number {return this.tileRow;}
    public setTileCol(value: number) {this.tileCol = value;}
    public getTileCol(): number {return this.tileCol;} 
    public setWorkerType(value: WORKER_TYPE) {this.workerType = value;}
    public getWorkerType(): WORKER_TYPE {return this.workerType;} 
    public setWorking(value: boolean) {this.working = value;}
    public isWorking(): boolean {return this.working;} 
    public setInitialCost(value: number) {this.initialCost = value;}
    public getInitialCost(): number {return this.initialCost;} 
    public setPersuasivePower(value: number) {this.persuasivePower = value;}
    public getPersuasivePower(): number {return this.persuasivePower;} 
    public setInfluencePower(value: number) {this.influencePower = value;}
    public getInfluencePower(): number {return this.influencePower;} 

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
            actionCount: this.actionCount, stars: this.stars, dailySalary: this.dailySalary, candidate: this.candidate, view: null});
        return worker;
    }
}