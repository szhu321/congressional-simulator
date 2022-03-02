import Phaser from "phaser";
import TileMap from "../model/tilemap";
import LeftPanelContainer from "../view/LeftPanelContainer.js";

export default class CampaignScene extends Phaser.Scene
{
    preload()
    {
        this.tileMap = new TileMap(6, 6);
        this.tileMapTiles;
        this.sidePanel;
    }

    create()
    {
        this.initializeSidePanel();
        // this.add.text(200, 200, 'Hello World');
        // let polygon = this.add.polygon(300, 300, this.polygonPoints(100), 0xffffff);
        // polygon.setOrigin(0.5, 0.5);
        // let polygon2 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100), 300, this.polygonPoints(100), 0xaaaaaa);
        // polygon2.setOrigin(0.5, 0.5);
        // let polygon3 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100) * 2, 300, this.polygonPoints(100), 0xffffff);
        // polygon3.setOrigin(0.5, 0.5);
        this.tileMap.setViews(this);
    }

    polygonPoints(verticalDiameter)
    {
        let halfDiameter = verticalDiameter / 2;
        let cosTimesHalfDiameter = Math.cos(30 * Math.PI / 180) * halfDiameter;
        let sinTimesHalfDiameter = Math.sin(30 * Math.PI / 180) * halfDiameter;
        let points = [
            [0, -halfDiameter],
            [cosTimesHalfDiameter, -sinTimesHalfDiameter],
            [cosTimesHalfDiameter, sinTimesHalfDiameter],
            [0, halfDiameter],
            [-cosTimesHalfDiameter, sinTimesHalfDiameter],
            [-cosTimesHalfDiameter, -sinTimesHalfDiameter]
        ]
        return points;
    }

    polygonCalcHorizonalDiameter(verticalDiameter)
    {
        return Math.cos(30 * Math.PI / 180) * verticalDiameter;
    }

    drawMap(tileMap, displayMode)
    {
        if(!this.tileMapTiles)
            this.initializeTileObjects(tileMap);
        
    }

    drawTile(tile)
    {
        if(!this.sidePanel)
            this.initializeSidePanel();
        this.updateSidePanel(tile);
    }

    updateSidePanel(tile)
    {
        this.sidePanel.updateDisplay([
            `Location(row, col): (${tile.row + 1}, ${tile.col + 1})`,
            `Symbol: ${tile.symbol}`,
            `Political Stance (-1 <- Liberal Conservative -> 1):`,
            `Economy: ${tile.ecomony}`,
            `Healthcare: ${tile.healthcare}`,
            `Education: ${tile.education}`,
            `Taxes: ${tile.taxes}`,
            `Environment: ${tile.environment}`
        ]);
    }

    initializeSidePanel()
    {
        this.sidePanel = new LeftPanelContainer(this);
        this.add.existing(this.sidePanel);
        this.sidePanel.initialize();
        this.sidePanel.updateDisplay(["Hello", "World"]);
        // let vgap = 50;
        // let fontSize = 20;
        // let locationText = this.add.text(0, 0 * vgap, "Location(row, col): ");
        // let symbolText = this.add.text(0, 1 * vgap, "Symbol: ");
        // let politicalStanceText = this.add.text(0, 2 * vgap, "(-1 <- Liberal Conservative -> 1):");
        // let economyText = this.add.text(0, 3* vgap, "Economy: ");
        // let healthcareText = this.add.text(0, 4* vgap, "Healthcare: ");
        // let educationText = this.add.text(0, 5* vgap, "Education: ");
        // let taxesText = this.add.text(0, 6* vgap, "taxes: ");
        // let environmentText = this.add.text(0, 7* vgap, "Environment: ");
        
        // this.sidePanel = {
        //     group: this.add.group([locationText, symbolText, politicalStanceText,
        //     economyText, healthcareText, educationText, taxesText, environmentText]),
        //     locationText,
        //     symbolText,
        //     politicalStanceText,
        //     economyText,
        //     healthcareText,
        //     educationText,
        //     taxesText,
        //     environmentText
        // }

        // for(let text of this.sidePanel.group.getChildren())
        // {
        //     text.setFontSize(fontSize);
        // }
    }

    initializeTileObjects(tileMap)
    {
        let startX = 700;
        let startY = 100;
        let verticalDiameter = 90;
        let points = this.polygonPoints(verticalDiameter);
        let hitarea = new Phaser.Geom.Polygon(points);
        this.tileMapTiles = new Array(tileMap.length);
        for(let i = 0; i < tileMap.length; i++)
        {
            this.tileMapTiles[i] = new Array(tileMap[i].length);
        }

        for(let row = 0; row < tileMap.length; row++)
        {
            for(let col = 0; col < tileMap[row].length; col++)
            {
                if(tileMap[row][col] != null)
                {
                    let x = startX + this.polygonCalcHorizonalDiameter(verticalDiameter) * col;
                    let y = startY + ((verticalDiameter/2)+Math.sin(30*Math.PI/180)*(verticalDiameter/2)) * row;
                    if(row % 2 == 1)
                    {
                        x += Math.cos(30*Math.PI/180) * verticalDiameter /2;
                    }
                    //let color = col % 2 == 1 ? 0xffffff: 0xaaaaaa;
                    let color = 0xeeeeee;
                    let hexagon = this.add.polygon(x, y, points, color);
                    hexagon.setOrigin(0.5, 0.5);
                    hexagon.setStrokeStyle(2, 0xaaaaaa);
                    hexagon.setInteractive(hitarea, Phaser.Geom.Polygon.Contains);
                    hexagon.on("pointerover", () => {
                        hexagon.setAlpha(0.8);
                        this.drawTile(this.tileMap.getTileAt(row,col));
                    });
                    hexagon.on("pointerout", ()=>{
                        hexagon.setAlpha(1);
                    });
                    this.tileMapTiles[row][col] = hexagon;
                }
            }
        }
    }
}