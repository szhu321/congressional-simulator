
/**
 * The number of milliseconds(in real life) that will pass before a day(in game) will pass.
 */
export enum DAY_SPEED {
    /**
     * 86,400,000 milliseconds.
     */
    REAL_TIME = 86400000,
    SLOWEST = 40000,
    SLOW = 20000,
    /**
     * 10000 milliseconds. Around 30min of gameplay time for 180 days in game.
     */
    NORMAL = 10000,
    FAST = 5000,
    FASTER = 2000,
    FASTEST = 500,
    FASTER_THAN_FASTEST = 30,
}

export enum POLITICAL_PARTY {
    REPUBLICAN_PARTY = "republican_party",
    DEMOCRATIC_PARTY = "democratic_party"
}

export enum GENDER {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export enum CARD_RANK {
    COMMON = "common",
    RARE = "rare",
    LEGENDARY = "legendary"
}

export enum GAME_EVENTS {
    DISPLAY_GAME_OVER_SCREEN = "display_game_over_screen",
    UPDATE_GLOBAL_CAMPAIGN_DATA = "update_global_campaign_data"
}