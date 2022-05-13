
export enum CAMPAIGN_EVENTS {
    /**
     * Args: (row: number, col: number, tile: Tile)
     */
    CAMPAIGN_SELECTED_TILE = "campaign_selected_tile",
    /**
     * Args: (type: WORKER_TYPE, candidate: CANDIDATE, tilePosition: TILE_POSITION)
     */
    CAMPAIGN_ADD_WORKER = "campaign_add_worker",
    UPDATE_WORKER_ON_MAP = "update_worker_on_map",
    /**
     * Args: (text: string)
     */
    DISPLAY_TEXT_POPUP = "display_text_popup",
}

export enum TILE_POSITION {
    SELECTED_TILE = "selected_tile",
    RAMDOM_TILE = "random_tile"
}

export enum WORKER_TYPE {
    COLD_CALLER = "cold_caller",
    LEAFLETER = "leafleter",
}

export enum CANDIDATE {
    OPPONENT = 'opponent',
    PLAYER = 'player',
    REPUBLICAN_PARTISAN = 'republican_partisan',
    DEMOCRATIC_PARTISAN = 'democratic_partisan'
}