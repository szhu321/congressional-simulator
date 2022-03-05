
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
        this.rank = 2;
        this.updateViewCallback = null;
    }

    /**
     * The config object contains properties of this card model 
     * that will be applied to the model. This is used to quickly set 
     * a bunch of attributes at once instead of calling set methods individually.
     * @param {object} configObject - the configObject.
     */
    setConfig(configObject)
    {
        let {name, cost, health, attack, ability, politicalIssue, politicalView, descirption, rank, updateViewCallback} = configObject;
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
     * The updateViewCallback is a function that can be called when this model gets updated.
     * It should accept one argument that contains information about the updated model.
     * @param {Function} updateViewCallback - The function that is called when this model gets updated.
     */
    setUpdateViewCallback(updateViewCallback)
    {
        this.updateViewCallback = updateViewCallback;
    }

    updateView()
    {
        if(this.updateViewCallback)
        {
            this.updateViewCallback(this);
        }
    }
}