import GAME_ENUM from "../gameenums";

export default class PlayerModel {

    /**
     * Name of the player
     * @type {String}
     */
    name;

    /**
     * Age of the player
     * @type {Number}
     */
    age;

    /**
     * The player's gender
     * @type {String}
     */
    gender;

    /**
     * The political pary the player is associated with.
     * @type {String}
     */
    politicalParty;

    /**
     * The district the player is running for.
     * @type {String}
     */
    district;

    /**
     * How much money the player currently has.
     * @type {Number}
     */
    money;

    /**
     * Measures how popular the player is with the people in thir district.
     * @type {Number}
     */
    districtPopularity;

    /**
     * Measures how popular the player is with their political party
     * @type {Number}
     */
    partyPopularity;

    /**
     * The total amount of time player has been playing.
     * @type {Number}
     */
    totalTimePlaying;


    /**
     * Congressional staff hired by the player
     * @type {Object[]}
     */
    staffMembers;


    /**
     * The player's occupation.
     * @type {String}
     */
    job;


    /**
     * The player's daily income.
     * @type {Number}
     */
    dailyIncome;

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
    }

    setConfig(configObject)
    {
        let {name, age, gender, politicalParty, district, money, districtPopularity, 
            partyPopularity, totalTimePlaying, staffMembers, job, dailyIncome} = configObject;
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
        if(dailyIncome) this.dailyIncome = this.dailyIncome;
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


}