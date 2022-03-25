
/**
 * Abilites are activated by playing cards. These abilites have 
 * different triggers (when played, when attacking, etc.) as well as 
 * different actions (gain $20, deal 10 damage to all opponents.)
 */
export default class Ability
{
    //ability type.
    static TYPES = {
       DRAW: "draw",
       INSTAKILL: "instakill",
       GAIN_MONEY: "gain_money",
       DOUBLE_ATTACK: "double_attack",
       DMG_ALL_OPPONENT: "damage_all_opponent",
       GAIN_ATTACK: "gain_attack",
       DMG_SINGLE_OPPONENT: "damage_single_opponent"
    }

    /**
     * @type {String} - An Enum string obtained from Ability.TYPES.[name];
     */
    private type: string;

    /**
     * @type {Number} - A number used as an argument for some abilities. Ex. Gain ${num} damage.
     */
    private num: number;
    
    /**
     * @type {Boolean} - Does this ability repeat or not. If it does it will be requeued.
     */
    private repeat: boolean;

    constructor(type: string, num: number, repeat: boolean)
    {
        this.type = type;
        this.num = num;
        this.repeat = repeat;
    }

}