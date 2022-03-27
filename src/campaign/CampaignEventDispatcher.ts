
export default class CampaignEventDispatcher extends Phaser.Events.EventEmitter
{
    private static singleton: CampaignEventDispatcher;

    constructor()
    {
        super();
    }

    public static getInstance(): CampaignEventDispatcher
    {
        if(!CampaignEventDispatcher.singleton)
            CampaignEventDispatcher.singleton = new CampaignEventDispatcher();
        return CampaignEventDispatcher.singleton;
    }
}