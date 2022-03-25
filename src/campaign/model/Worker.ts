import {CARD_RANK} from "../../gameenums";
import WorkerView from "../view/WorkerView";

export default class Worker
{
    private ability: string;
    private name: string;
    private description: string;
    private rank: CARD_RANK;
    private view: WorkerView;
    private actionCount: number;
    private stars: number;

    constructor()
    {
        this.ability = "";
        this.name = "Unnamed";
        this.description = "";
        this.rank = CARD_RANK.COMMON;//rarity of the card.
        this.view = null;
        this.actionCount = 0;
        this.stars = 1;//number of starts this card has.
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    public setConfig(configObject)
    {
        let {name, ability, descirption, rank,
             actionCount, stars} = configObject;
        if(name) this.name = name;
        if(ability) this.ability = ability;
        if(descirption) this.description = descirption;
        if(rank) this.rank = rank;
        if(actionCount) this.actionCount = actionCount;
        if(stars) this.stars = stars;
        //this.updateDefaults(configObject);
        this.updateView();
    }

    // updateDefaults(configObject)
    // {
    //     let {name, cost, health, attack, ability, politicalIssue, politicalView, 
    //         descirption, rank, updateViewCallback, actionCount, stars, isAttacking, isWorker} = configObject;
    //     if(name) this.default.name = name;
    //     if(cost) this.default.cost = cost;
    //     if(health) this.default.health = health;
    //     if(attack) this.default.attack = attack;
    //     if(ability) this.default.ability = ability;
    //     if(politicalIssue) this.default.politicalIssue = politicalIssue;
    //     if(politicalView) this.default.politicalView = politicalView;
    //     if(descirption) this.default.description = descirption;
    //     if(rank) this.default.rank = rank;
    //     if(updateViewCallback) this.default.updateViewCallback = updateViewCallback;
    //     if(actionCount) this.default.actionCount = actionCount;
    //     if(stars) this.default.stars = stars;
    //     if(isAttacking !== undefined) this.default.isAttacking = isAttacking;
    //     if(isWorker !== undefined) this.default.isWorker = isWorker;
    // }

    // restoreToDefault()
    // {
    //     this.setConfig(this.default);
    // }

    // clone()
    // {
    //     let cardModel = new CardModel();
    //     cardModel.setConfig(this);
    //     return cardModel;
    // }

    public getStar()
    {
        return this.stars;
    }

    /**
     * @param {Number} stars - the number of stars this card will be set to.
     */
    public setStars(stars)
    {
        this.stars = stars;
    }

    // hasAction()
    // {
    //     return this.actionCount > 0;
    // }

    // /**
    //  * Decrease the actionCount of this card by 1.
    //  * @returns {Boolean} True if an action was used. False if there was no action left.
    //  */
    // useAction()
    // {
    //     if(!this.hasAction())
    //         return false;
    //     this.actionCount--;
    //     this.updateView();
    //     return true;
    // }

    /**
     * 
     * @param {*} actionCount 
     */
    public setAction(actionCount)
    {
        this.actionCount = actionCount;
        this.updateView();
    }

    public getName()
    {
        return this.name;
    }

    public setName(name)
    {
        this.name = name;
        this.updateView();
    }

    public setDescription(descirption)
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

    public setAbility(ability)
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
}