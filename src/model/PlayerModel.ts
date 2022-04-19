import { GENDER, POLITICAL_PARTY } from "../gameenums";

export default class PlayerModel {

    /**
     * Name of the player
     */
    private name: String;

    /**
     * Age of the player
     */
    private age: number;

    /**
     * The player's gender
     */
    private gender: string;

    /**
     * The political pary the player is associated with.
     */
    private politicalParty: string;

    /**
     * The district the player is running for.
     * @type {String}
     */
    private district: number;

    /**
     * How much money the player currently has.
     */
    private money: number;

    /**
     * Measures how popular the player is with the people in thir district.
     */
    private districtPopularity: number;

    /**
     * Measures how popular the player is with their political party
     */
    private partyPopularity: number;

    /**
     * The total amount of time player has been playing.
     */
    private totalTimePlaying: number;


    /**
     * Congressional staff hired by the player
     * @type {Object[]}
     */
    private staffMembers: object[];


    /**
     * The player's occupation.
     */
    private job: string;


    /**
     * The player's daily income.
     */
    private dailyIncome: number;

    /**
     * The amount of money the player has spent.
     */
    private moneySpent: number;

    /**
     * Can the player see the total number of voters for each tile.
     */
    private canSeeTotalVoters: boolean;

    /**
     * Can the player their own votes for each tile.
     */
    private canSeeYourVoters: boolean;

    /**
     * Can the player see the economic political stance of the tile.
     */
    private canSeePoliticalStanceEconomy: boolean;

    /**
     * Can the player see the healthcare political stance of the tile.
     */
    private canSeePoliticalStanceHealthCare: boolean;
    /**
     * Can the player see the education political stance of the tile.
     */
    private canSeePoliticalStanceEducation: boolean;
     /**
     * Can the player see the healthcare political stance of the tile.
     */
    private canSeePoliticalStanceTaxes: boolean;
    /**
     * Can the player see the environment political stance of the tile.
     */
    private canSeePoliticalStanceEnvironment: boolean;

    

    constructor() {
        this.name = "Your Name";
        this.money = 0;
        this.age = 30;
        this.gender = GENDER.MALE;
        this.politicalParty = POLITICAL_PARTY.DEMOCRATIC_PARTY;
        this.district = 0;
        this.districtPopularity = 0;
        this.partyPopularity = 0;
        this.totalTimePlaying = 0;
        this.staffMembers = [];
        this.job = "NONE";
        this.dailyIncome = 0;
        this.moneySpent = 0;

    }

    setConfig(configObject: {name?: string, age?: number, gender?: string, politicalParty?: string, district?: number,
    money: number, districtPopularity?: number, partyPopularity?: number, totalTimePlaying?: number, staffMembers?: object[],
    job?: string, dailyIncome?: number, moneySpent?: number})
    {
        let {name, age, gender, politicalParty, district, money, districtPopularity, 
            partyPopularity, totalTimePlaying, staffMembers, job, dailyIncome,
            moneySpent} = configObject;
        if(name) this.name = name;
        if(age) this.age = age;
        if(gender) this.gender = gender;
        if(politicalParty) this.politicalParty = politicalParty;
        if(district) this.district = district;
        if(money) this.money = money;
        if(districtPopularity) this.districtPopularity = districtPopularity;
        if(partyPopularity) this.partyPopularity = partyPopularity;
        if(totalTimePlaying) this.totalTimePlaying = totalTimePlaying;
        if(staffMembers) this.staffMembers = staffMembers;
        if(job) this.job = job;
        if(dailyIncome) this.dailyIncome = dailyIncome;
        if(moneySpent) this.moneySpent = moneySpent;
    }

    getName()
    {
        return this.name;
    }

    setName(value: string)
    {
        this.name = value;
    }

    getAge()
    {
        return this.age;
    }

    setAge(value: number)
    {
        this.age = value;
    }

    getGender()
    {
        return this.gender;
    }

    setGender(value: GENDER)
    {
        this.gender = value;
    }

    getPoliticalParty()
    {
        return this.politicalParty;
    }

    setPoliticalParty(value: POLITICAL_PARTY)
    {
        this.politicalParty = value;
    }

    getDistrict()
    {
        return this.district;
    }

    setDistrict(value: number)
    {
        this.district = value;
    }

    getMoney()
    {
        return this.money;
    }

    setMoney(value: number)
    {
        this.money = value;
    }

    addMoney(value: number)
    {
        this.money += value;
    }

    getDistrictPopularity()
    {
        return this.districtPopularity;
    }

    setDistrictPopularity(value: number)
    {
        this.districtPopularity = value;
    }

    getPartyPopularity()
    {
        return this.getPartyPopularity;
    }

    setPartyPopularity(value: number)
    {
        this.partyPopularity = value;
    }

    getTotalTimePlaying()
    {
        return this.getTotalTimePlaying;
    }

    setTotalTimePlaying(value: number)
    {
        this.totalTimePlaying = value;
    }

    getStaffMembers()
    {
        return this.staffMembers;
    }

    getJob()
    {
        return this.job;
    }

    setJob(value: string)
    {
        this.job = value;
    }

    getDailyIncome()
    {
        return this.dailyIncome;
    }

    setDailyIncome(value: number)
    {
        this.dailyIncome = value;
    }

    getMoneySpent()
    {
        return this.moneySpent;
    }

    setMoneySpent(value: number)
    {
        this.moneySpent = value;
    }

}