import chroma = require("chroma-js");
import PlayerData from "../../data/PlayerData";
import { POLITICAL_PARTY } from "../../gameenums";
import { CAMPAIGN_EVENTS, CANDIDATE } from "../campaignenum";
import CampaignEventDispatcher from "../CampaignEventDispatcher";
import TileController from "../controller/TileController";
import Tile from "../model/Tile";
import CampaignScene from '../scenes/CampaignScene';

export default class TileViewOld extends Phaser.GameObjects.Polygon //TODO: reformat the tile as a Phaser.Container
{
    private campaignScene: CampaignScene;
    private tileController: TileController;
    private row: number;
    private col: number;

    private playerWorkingIcon: Phaser.GameObjects.Rectangle;
    private opponentWorkingIcon: Phaser.GameObjects.Rectangle;

    private imageLoaded: boolean;
    private populationImage: Phaser.GameObjects.Image;

    constructor(scene: CampaignScene, x: number, y: number, points: any, color: number, row: number, col: number)
    {
        super(scene, x, y, points, color);
        this.campaignScene = scene;
        this.row = row;
        this.col = col;
        this.imageLoaded = false;
        let tileStrokeSize = 5;
        let hitarea = new Phaser.Geom.Polygon(points);
        this.setOrigin(0.5, 0.5);
        this.setStrokeStyle(tileStrokeSize, 0xaaaaaa);
        this.setInteractive({hitArea: hitarea, hitAreaCallback: Phaser.Geom.Polygon.Contains ,useHandCursor: true});
        this.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.setAlpha(0.8);
            //this.drawTile(this.tileMap.getTileAt(row,col));
        });
        this.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.setAlpha(1);
        });
        this.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
            if(pointer.leftButtonReleased())
            {
                //add a event system.
                let emitter = CampaignEventDispatcher.getInstance();
                emitter.emit(CAMPAIGN_EVENTS.CAMPAIGN_SELECTED_TILE, this.row, this.col, this.tileController.getTile());
            }
        })
    }

    public setRow(value: number) {this.row = value;}
    public setCol(value: number) {this.col = value;}
    public getRow(): number {return this.row;}
    public getCol(): number {return this.col;}

    public setTileController(value: TileController) {this.tileController = value;}
    public getTileController(): TileController {return this.tileController;}

    public getCampaignScene():CampaignScene {return this.campaignScene;}

    public updateView(tile: Tile)
    {
        let percentageOccupied = tile.percentageOccupied();
        let playerOccupied = tile.percentageOccupiedBy(CANDIDATE.PLAYER);
        let opponentOccupied = tile.percentageOccupiedBy(CANDIDATE.OPPONENT);
        let republicanParticanOccupied = tile.percentageOccupiedBy(CANDIDATE.REPUBLICAN_PARTISAN);
        let democraticParticanOccupied = tile.percentageOccupiedBy(CANDIDATE.DEMOCRATIC_PARTISAN);
        let tileStrokeSize = 5;
        
        /* Loading an image is performed once per tile. The image that will be displayed
        would be based on the population of the tile. If the population is below a certain
        threshold, no image is added.
        */
        if(this.imageLoaded === false)
        {
            let population = tile.getNumberOfVoters();
            console.log(population);
            if(population < 100)
            {
                //do nothing   
            }
            else
            {
                let imageName = "tile_city";
                if(population < 1000)
                {
                    imageName = "tile_rural";
                }
                else if(population < 10000)
                {
                    imageName = "tile_town";
                }
                this.populationImage = this.scene.add.image(this.x, this.y, imageName);
                this.populationImage.setOrigin(0.5, 0.5);
            }
            this.imageLoaded = true;
        }

        if(tile.isWorkerOnTile())
        {
            this.setStrokeStyle(tileStrokeSize, 0x37ed98);
        }
        
        //Workers on the tile.
        let playerColor = "blue";
        let opponentColor = "red";
        if(PlayerData.getPlayer().getPoliticalParty() === POLITICAL_PARTY.REPUBLICAN_PARTY)
        {
            playerColor = "red";
            opponentColor = "blue";
            playerOccupied += republicanParticanOccupied;
            opponentOccupied += democraticParticanOccupied;
        }
        else if(PlayerData.getPlayer().getPoliticalParty() === POLITICAL_PARTY.DEMOCRATIC_PARTY)
        {
            playerColor = "blue";
            opponentColor = "red";
            opponentOccupied += republicanParticanOccupied;
            playerOccupied += democraticParticanOccupied;
        }

        // TODO: fix the color scale to incorportate the partisans.
        //first scale from red and blue.
        let colorScale = chroma.scale([opponentColor, playerColor]);
        let colorStr = colorScale(playerOccupied/percentageOccupied).toString();
        let colorSaturation = chroma.scale(['eeeeee', colorStr]);

        //desaturate the color depending on the percentage Occupied.
        let hexNum = parseInt(colorSaturation(percentageOccupied - 0.2).toString().substring(1), 16);
        //console.log(percentageOccupied, hexNum);
        this.setFillStyle(hexNum);
    }
}
