import PlayerData from '../../data/PlayerData';
import { SCENE_CONFIG } from '../../gameconfig';
import { CAMPAIGN_EVENTS, CANDIDATE } from '../campaignenum';
import CampaignEventDispatcher from '../CampaignEventDispatcher';
import Tile from '../model/Tile';

export default class LeftPanelContainer extends Phaser.GameObjects.Container
{
    private maxLines: number;
    private vgap: number;
    private fontSize: number;
    private fontFamily: string;
    private panelWidth: number;
    private panelHeight: number;
    private background: Phaser.GameObjects.Rectangle;
    private backgroundColor: number;
    private backgroundBorderWidth: number;
    private backgroundBorderColor: number;
    private texts: Phaser.GameObjects.Text[];

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        this.maxLines = 14;
        this.vgap = 35;
        this.fontSize = 18;
        this.fontFamily = SCENE_CONFIG.scene_font_family;
        this.panelWidth = 300;
        this.panelHeight = SCENE_CONFIG.scene_height;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
        this.texts = [];
        this.initialize();
        this.setActive(true);
    }

    preUpdate()
    {
        //check player data for the current selected tile and display its information.
        this.updateSidePanel(PlayerData.getCampaignData().getSelectedTile());
    }

    private initialize()
    {
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.panelWidth, this.panelHeight, this.backgroundColor);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        background.setOrigin(0,0);
        this.add(background);
        this.background = background;

        for(let i = 0; i < this.maxLines; i++)
        {
            let text = this.scene.add.text(0, i * this.vgap, "" , {wordWrap: {width: this.panelWidth}});
            text.setFontSize(this.fontSize);
            text.setFontFamily(this.fontFamily);
            this.add(text);
            this.texts.push(text);
        }
        this.initializeInteractiveZone();
    }

    private initializeInteractiveZone()
    {
        let width = this.background.width;
        let height = this.background.height;
        let hitarea = new Phaser.Geom.Rectangle(0, 0, width, height);
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

    public updateDisplay(textArray: string[])
    {
        let texts = this.texts;
        for(let i = 0; i < texts.length; i++)
        {
            if(i < textArray.length)
            {
                texts[i].setText(textArray[i]);
            }
            else
            {
                texts[i].setText("");
            }
        }
    }

    public updateSidePanel(tile: Tile): void
    {
        if(!tile)
        {
            this.updateDisplay([]);
            return;
        }

        let yourVotes = 0;
        let info = tile.getCandidateInfoFor(CANDIDATE.PLAYER);
        if(info)
            yourVotes = info.getAmountOccupied();
        let opponentVotes = 0;
        info = tile.getCandidateInfoFor(CANDIDATE.OPPONENT);
        if(info)
            opponentVotes = info.getAmountOccupied();
        this.updateDisplay([
            `Location(row, col): (${tile.getRow() + 1}, ${tile.getCol() + 1})`,
            `Total Voters: ${tile.getNumberOfVoters()}`,
            `Total Voters Secured: ${tile.totalOccupied()}`,
            `Your Voters: ${yourVotes}`,
            `Opponent Voters: ${opponentVotes}`,
            //`Worker On Tile: ${tile.isWorkerOnTile()}`,
            `Political Stance (-1 <- Liberal Conservative -> 1):`,
            `Economy: ${tile.getEconomy()}`,
            `Healthcare: ${tile.getHealthcare()}`,
            `Education: ${tile.getEducation()}`,
            `Taxes: ${tile.getTaxes()}`,
            `Environment: ${tile.getEnvironment()}`
        ]);
    }
}