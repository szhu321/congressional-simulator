import { GAME_ENUM } from "../gameenums";

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

    constructor() {
        this.name = "Sheng Wei";
        this.money = 0;
        this.age = 30;
        this.gender = GAME_ENUM.GENDER.MALE;
        this.politicalParty = GAME_ENUM.POLITICAL_PARTY.DEMOCRATIC_PARTY;
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

    getAge()
    {
        return this.age;
    }

    getGender()
    {
        return this.gender;
    }

    getPoliticalParty()
    {
        return this.politicalParty;
    }

    getDistrict()
    {
        return this.district;
    }

    getMoney()
    {
        return this.money;
    }

    getDistrictPopularity()
    {
        return this.districtPopularity;
    }

    getPartyPopularity()
    {
        return this.getPartyPopularity;
    }

    getTotalTimePlaying()
    {
        return this.getTotalTimePlaying;
    }

    getStaffMembers()
    {
        return this.staffMembers;
    }

    getJob()
    {
        return this.job;
    }

    getDailyIncome()
    {
        return this.dailyIncome;
    }

    getMoneySpent()
    {
        return this.moneySpent;
    }

}