import PlayerData from '../../data/PlayerData';
import Button from '../../phaserobjs/Button';
import { CAMPAIGN_EVENTS } from '../campaignenum';
import CampaignEventDispatcher from '../CampaignEventDispatcher';
import CampaignScene from '../scenes/CampaignScene';

export default class BottomPanelContainer extends Phaser.GameObjects.Container
{
    private items: Button[];
    private panelWidth: number;
    private panelHeight: number;
    private backgroundColor: number;
    private backgroundBorderWidth: number;
    private backgroundBorderColor: number;
    private campaignScene: CampaignScene;

    constructor(scene: CampaignScene)
    {
        super(scene);
        this.panelWidth = 1050;
        this.panelHeight = 220;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
        this.items = [];
        this.campaignScene = scene;
        this.initialize();
    }

    private initialize()
    {
        //console.log("Initializing bottom container..");
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.panelWidth, this.panelHeight, this.backgroundColor);
        background.setOrigin(1, 1);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        this.add(background);
        //add worker buttons.
        this.initializeWorkerButtons();
    }

    private initializeWorkerButtons()
    {
        let button = new Button(this.scene, -this.panelWidth + 150, -this.panelHeight/2, 200, 100);
        button.getText().setText("Cold Caller\n $30 \n\n Send");
        button.setOnclickCallback(() => {
            console.log("Bottom panel button 1 clicked.");
            CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER, null);
            let moneySpent = PlayerData.getPlayer().getMoneySpent();
            PlayerData.getPlayer().setMoneySpent(moneySpent + 30);
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);

        button = new Button(this.scene, -this.panelWidth + 400, -this.panelHeight/2, 200, 100);
        button.getText().setText("leafleter\n $100 \n\n Send");
        button.setOnclickCallback(() => {
            console.log("Bottom panel button 2 clicked.");
            CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER, null);
            let moneySpent = PlayerData.getPlayer().getMoneySpent();
            PlayerData.getPlayer().setMoneySpent(moneySpent + 100);
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);
    }

    displayItems()
    {
        for(let item of this.items)
            item.setVisible(true);
    }

    hideItems()
    {
        for(let item of this.items)
            item.setVisible(false);
    }
}