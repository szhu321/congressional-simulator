
export default class CardModel
{
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
        this.rank = 1;//rarity of the card.
        this.view = null;
        this.actionCount = 0;
        this.stars = 1;//number of starts this card has.

        //worker card properties
        //stars, cost, name, isAttacking, health. isWorker.
        this.isAttacking = false;
        this.isWorker = false;
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    setConfig(configObject)
    {
        let {name, cost, health, attack, ability, politicalIssue, politicalView, 
            descirption, rank, updateViewCallback, actionCount, stars, isAttacking, isWorker} = configObject;
        if(name) this.name = name;
        if(cost) this.cost = cost;
        if(health) this.health = health;
        if(attack) this.attack = attack;
        if(ability) this.ability = ability;
        if(politicalIssue) this.politicalIssue = politicalIssue;
        if(politicalView) this.politicalView = politicalView;
        if(descirption) this.description = descirption;
        if(rank) this.rank = rank;
        if(updateViewCallback) this.updateViewCallback = updateViewCallback;
        if(actionCount) this.actionCount = actionCount;
        if(stars) this.stars = stars;
        if(isAttacking !== undefined) this.isAttacking = isAttacking;
        if(isWorker !== undefined) this.isWorker = isWorker;
        this.updateView();
    }

    clone()
    {
        let cardModel = new CardModel();
        cardModel.setConfig(this);
        return cardModel;
    }

    getIsWorker()
    {
        return this.isWorker;
    }

    setIsWorker(isWorker)
    {
        this.isWorker = isWorker;
        this.updateView();
    }

    getIsAttacking()
    {
        return this.isAttacking;
    }

    setIsAttacking(isAttacking)
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
    setStars(stars)
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
    useAction()
    {
        if(!this.hasAction())
            return false;
        this.actionCount--;
        this.updateView();
        return true;
    }

    /**
     * 
     * @param {*} actionCount 
     */
    setAction(actionCount)
    {
        this.actionCount = actionCount;
        this.updateView();
    }

    getName()
    {
        return this.name;
    }

    setName(name)
    {
        this.name = name;
        this.updateView();
    }

    setDescription(descirption)
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
    setRank(rank)
    {
        this.rank = rank;
        if(this.rank > 3)
            this.rank = 3;
        if(this.rank < 1)
            this.rank = 1;
        this.updateView();
    }

    getRank()
    {
        return this.rank;
    }

    setCost(cost)
    {
        this.cost = cost;
        this.updateView();
    }

    getCost()
    {
        return this.cost;
    }

    setHealth(health)
    {
        this.health = health;
        this.updateView();
    }

    getHealth()
    {
        return this.health;
    }

    setAttack(attack)
    {
        this.attack = attack;
        this.updateView();
    }

    getAttack()
    {
        return this.attack;
    }

    setAbility(ability)
    {
        this.ability = ability;
        this.updateView();
    }

    getAbility()
    {
        return this.ability;
    }

    setPoliticalView(politicalView)
    {
        this.politicalView = politicalView;
        this.updateView();
    }

    getPoliticalView()
    {
        return this.politicalView;
    }

    setPoliticalIssue(politicalIssue)
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
    setView(view)
    {
        this.view = view;
    }

    updateView()
    {
        if(this.view)
        {
            this.view.updateViewCallback(this);
        }
    }
}