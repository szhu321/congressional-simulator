import chroma = require("chroma-js");
import Tile from "../model/Tile";
import CampaignScene from '../scenes/CampaignScene';

export default class TileView extends Phaser.GameObjects.Polygon
{
    private campaignScene: CampaignScene;
    private row: number;
    private col: number;

    constructor(scene: CampaignScene, x: number, y: number, points: any, color: number, row: number, col: number)
    {
        super(scene, x, y, points, color);
        this.campaignScene = scene;
        this.row = row;
        this.col = col;
        let tileStrokeSize = 5;
        let hitarea = new Phaser.Geom.Polygon(points);
        this.setOrigin(0.5, 0.5);
        this.setStrokeStyle(tileStrokeSize, 0xaaaaaa);
        this.setInteractive({hitArea: hitarea, hitAreaCallback: Phaser.Geom.Polygon.Contains ,useHandCursor: true});
        this.on("pointerover", () => {
            this.setAlpha(0.8);
            //this.drawTile(this.tileMap.getTileAt(row,col));
        });
        this.on("pointerout", () => {
            this.setAlpha(1);
        });
        this.on("pointerup", () => {
            //TODO: add a messaging system.
            let selectedTile = this.campaignScene.getSelectedTile();
            if(selectedTile && selectedTile.row === this.row && selectedTile.col === this.col)
                this.campaignScene.deselectTile();
            else
                this.campaignScene.setSelectedTile({row: this.row, col: this.col})
            //console.log("Pressed");
        })
    }

    public updateView(tile: Tile)
    {
        let percentageOccupied = tile.percentageOccupied();
        let tileStrokeSize = 5;
        if(tile.isWorkerOnTile())
        {
            this.setStrokeStyle(tileStrokeSize, 0x37ed98);
        }
        let colorScale = chroma.scale(['eeeeee', 'blue']);
        let hexNum = parseInt(colorScale(percentageOccupied).toString().substring(1), 16);
        //console.log(percentageOccupied, hexNum);
        this.setFillStyle(hexNum);
    }
}
