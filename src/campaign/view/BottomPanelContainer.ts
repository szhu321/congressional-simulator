import PlayerData from '../../data/PlayerData';
import Button from '../../phaserobjs/Button';
import { CAMPAIGN_EVENTS, CANDIDATE, TILE_POSITION, WORKER_TYPE } from '../campaignenum';
import CampaignEventDispatcher from '../CampaignEventDispatcher';
import WorkerFactory from '../factory/WorkerFactory';
import CampaignScene from '../scenes/CampaignScene';

export default class BottomPanelContainer extends Phaser.GameObjects.Container
{
    private items: Button[];
    private panelWidth: number;
    private panelHeight: number;
    private background: Phaser.GameObjects.Rectangle;
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
        this.background = background;
        //add worker buttons.
        this.initializeWorkerButtons();
        this.initializeInteractiveZone();
    }

    private initializeInteractiveZone()
    {
        let width = this.background.width;
        let height = this.background.height;
        let hitarea = new Phaser.Geom.Rectangle(-width, -height, width, height);
        this.setInteractive({
            hitArea: hitarea, 
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
        });
        this.preventEventPropogataion();
    }

    private preventEventPropogataion()
    {
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_MOVE, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
    }

    private initializeWorkerButtons()
    {
        let button = new Button(this.scene, -this.panelWidth + 150, -this.panelHeight/2, 200, 100);
        button.getText().setText("Cold Caller\n $30 \n\n Send");
        button.setOnclickCallback(() => {
            //console.log("Bottom panel button 1 clicked.");
            if(this.spendMoney(30))
                CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER,
                    WORKER_TYPE.COLD_CALLER, CANDIDATE.PLAYER, TILE_POSITION.SELECTED_TILE);
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);

        button = new Button(this.scene, -this.panelWidth + 400, -this.panelHeight/2, 200, 100);
        button.getText().setText("leafleter\n $100 \n\n Send");
        button.setOnclickCallback(() => {
            //console.log("Bottom panel button 2 clicked.");
            if(this.spendMoney(100))
                CampaignEventDispatcher.getInstance().emit(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER,
                    WORKER_TYPE.LEAFLETER, CANDIDATE.PLAYER, TILE_POSITION.SELECTED_TILE);
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);
    }

    /**
     * 
     * @param value - the amount to spend.
     * @returns {boolean} True if the money was successfully spent. False otherwise (no money left).
     */
    public spendMoney(value: number): boolean
    {
        let currentFunds = PlayerData.getPlayer().getMoney();
        let newFunds = currentFunds - value;
        if(newFunds < 0)
        {
            console.log(`Cannot spend money. You have $${currentFunds}. You want to spend $${value}`);
            return false;
        }
        PlayerData.getPlayer().setMoney(newFunds);
        return true;
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