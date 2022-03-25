import CardView from "../views/CardView";
import { CARD_RANK} from "../../gameenums"

export default class CardModel
{
    private cost: number;
    private health: number;
    private attack: number;
    private ability: string;
    private name: string;
    private politicalIssue: string;
    private politicalView: string;
    private description: string;
    private rank: CARD_RANK;
    private view: CardView;
    private actionCount: number;
    private stars: number;
    private isAttacking: boolean;
    private isWorker: boolean;
    private default: {
        cost: number,
        health: number,
        attack: number,
        ability: string,
        name: string,
        politicalIssue: string,
        politicalView: string,
        description: string,
        rank: CARD_RANK,
        view: CardView,
        actionCount: number,
        stars: number,
        isAttacking: boolean,
        isWorker: boolean
    };

    constructor()
    {
        this.cost = 100;
        this.health = 30;
        this.attack = 0;
        this.ability = "";
        this.name = "Unnamed";
        this.politicalIssue = "";
        this.politicalView = "";
        this.description = "";
        this.rank = CARD_RANK.COMMON; //rarity of the card.
        this.view = null;
        this.actionCount = 0;
        this.stars = 1; //number of stars this card has.

        //worker card properties
        //stars, cost, name, isAttacking, health. isWorker.
        this.isAttacking = false;
        this.isWorker = false;

        this.default = {
            cost : 100,
            health : 30,
            attack : 0,
            ability : "",
            name : "Unnamed",
            politicalIssue : "",
            politicalView : "",
            description : "",
            rank : CARD_RANK.COMMON, //rarity of the card.
            view : null,
            actionCount : 0,
            stars: 1, //number of starts this card has.
            isAttacking: false,
            isWorker: false
        }
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    setConfig(configObject: {cost: number, health: number, attack: number, ability: string, name?: string, politicalIssue: string,
        politicalView: string, description?: string, rank: CARD_RANK, view?: CardView, actionCount?: number, stars?: number,
        isAttacking?: boolean, isWorker: boolean})
    {
        let {name, cost, health, attack, ability, politicalIssue, politicalView, 
            description, rank, /* updateViewCallback ,*/ actionCount, stars, isAttacking, isWorker} = configObject;
        if(name) this.name = name;
        if(cost) this.cost = cost;
        if(health) this.health = health;
        if(attack) this.attack = attack;
        if(ability) this.ability = ability;
        if(politicalIssue) this.politicalIssue = politicalIssue;
        if(politicalView) this.politicalView = politicalView;
        if(description) this.description = description;
        if(rank) this.rank = rank;
        // if(updateViewCallback) this.updateViewCallback = updateViewCallback;
        if(actionCount) this.actionCount = actionCount;
        if(stars) this.stars = stars;
        if(isAttacking !== undefined) this.isAttacking = isAttacking;
        if(isWorker !== undefined) this.isWorker = isWorker;
        this.updateDefaults(configObject);
        this.updateView();
    }

    updateDefaults(configObject: {cost: number, health: number, attack: number, ability: string, name?: string, politicalIssue: string,
        politicalView: string, description?: string, rank: CARD_RANK, view?: CardView, actionCount?: number, stars?: number,
        isAttacking?: boolean, isWorker: boolean})
    {
        let {name, cost, health, attack, ability, politicalIssue, politicalView, 
            description, rank/* , updateViewCallback*/, actionCount, stars, isAttacking, isWorker} = configObject;
        if(name) this.default.name = name;
        if(cost) this.default.cost = cost;
        if(health) this.default.health = health;
        if(attack) this.default.attack = attack;
        if(ability) this.default.ability = ability;
        if(politicalIssue) this.default.politicalIssue = politicalIssue;
        if(politicalView) this.default.politicalView = politicalView;
        if(description) this.default.description = description;
        if(rank) this.default.rank = rank;
        // if(updateViewCallback) this.default.updateViewCallback = updateViewCallback;
        if(actionCount) this.default.actionCount = actionCount;
        if(stars) this.default.stars = stars;
        if(isAttacking !== undefined) this.default.isAttacking = isAttacking;
        if(isWorker !== undefined) this.default.isWorker = isWorker;
    }

    restoreToDefault()
    {
        this.setConfig(this.default);
    }

    clone()
    {
        let cardModel = new CardModel();
        cardModel.setConfig({cost: this.cost, health: this.health, attack: this.attack, ability: this.ability, name: this.name,
        politicalIssue: this.politicalIssue, politicalView: this.politicalView, description: this.description, rank: this.rank,
        view: this.view, actionCount: this.actionCount, stars: this.stars, isAttacking: this.isAttacking, isWorker: this.isWorker});
        return cardModel;
    }

    getIsWorker()
    {
        return this.isWorker;
    }

    setIsWorker(isWorker: boolean)
    {
        this.isWorker = isWorker;
        this.updateView();
    }

    getIsAttacking()
    {
        return this.isAttacking;
    }

    setIsAttacking(isAttacking: boolean)
    {
        this.isAttacking = isAttacking;
        this.updateView();
    }


    getStar()
    {
        return this.stars;
    }

    /**
     * @param {Number} stars - the number of stars this card will be set to.
     */
    setStars(stars: number)
    {
        this.stars = stars;
    }

    hasAction()
    {
        return this.actionCount > 0;
    }

    /**
     * Decrease the actionCount of this card by 1.
     * @returns {Boolean} True if an action was used. False if there was no action left.
     */
    useAction(): boolean
    {
        if(!this.hasAction())
            return false;
        this.actionCount--;
        this.updateView();
        return true;
    }

    setAction(actionCount: number)
    {
        this.actionCount = actionCount;
        this.updateView();
    }

    getName()
    {
        return this.name;
    }

    setName(name: string)
    {
        this.name = name;
        this.updateView();
    }

    setDescription(descirption: string)
    {
        this.description = descirption;
        this.updateView(); 
    }

    getDescription()
    {
        return this.description;
    }

    /**
     * 
     * @param {Number} rank - 1, 2 or 3. One means normal, two means rare, 3 means legendary. 
     */
    setRank(rank: CARD_RANK)
    {
        this.rank = rank;
        // if(this.rank > CARD_RANK.LEGENDARY)
        //     this.rank = CARD_RANK.LEGENDARY;
        // if(this.rank < CARD_RANK.COMMON)
        //     this.rank = CARD_RANK.COMMON;
        this.updateView();
    }

    getRank()
    {
        return this.rank;
    }

    setCost(cost: number)
    {
        this.cost = cost;
        this.updateView();
    }

    getCost()
    {
        return this.cost;
    }

    setHealth(health: number)
    {
        this.health = health;
        this.updateView();
    }

    getHealth()
    {
        return this.health;
    }

    setAttack(attack: number)
    {
        this.attack = attack;
        this.updateView();
    }

    getAttack()
    {
        return this.attack;
    }

    setAbility(ability: string)
    {
        this.ability = ability;
        this.updateView();
    }

    getAbility()
    {
        return this.ability;
    }

    setPoliticalView(politicalView: string)
    {
        this.politicalView = politicalView;
        this.updateView();
    }

    getPoliticalView()
    {
        return this.politicalView;
    }

    setPoliticalIssue(politicalIssue: string)
    {
        this.politicalIssue = politicalIssue;
        this.updateView();
    }

    getPoliticalIssue()
    {
        return this.politicalIssue;
    }

    /**
     * The view has a function called updateViewCallback(model) can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} view - The view for this model.
     */
    setView(view: CardView)
    {
        this.view = view;
    }

    getView(){
        return this.view;
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}