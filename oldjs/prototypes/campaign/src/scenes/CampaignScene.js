import Phaser from "phaser";
import MapController from "../controller/MapController";
import TimeController from "../controller/TimeController";
import TileMap from "../model/tilemap";
import LeftPanelContainer from "../view/LeftPanelContainer.js";
import chroma from 'chroma-js';
import BottomPanelContainer from "../view/BottomPanelContainer.js";

export default class CampaignScene extends Phaser.Scene
{
    preload()
    {
        this.tileMap = new TileMap(6, 6);
        this.screenSize = this.game.scale;
        this.tileMapTiles;
        this.sidePanel;
        this.dayDisplay;
        this.mapController;
        this.bottomPanel;
    }

    create()
    {
        this.initializeSidePanel();
        this.initializeDayDisplay();
        this.initializeMapController();
        this.initializeBottomPanel();
        // this.add.text(200, 200, 'Hello World');
        // let polygon = this.add.polygon(300, 300, this.polygonPoints(100), 0xffffff);
        // polygon.setOrigin(0.5, 0.5);
        // let polygon2 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100), 300, this.polygonPoints(100), 0xaaaaaa);
        // polygon2.setOrigin(0.5, 0.5);
        // let polygon3 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100) * 2, 300, this.polygonPoints(100), 0xffffff);
        // polygon3.setOrigin(0.5, 0.5);
        this.tileMap.setViews(this);
    }

    initializeBottomPanel()
    {
        this.bottomPanel = new BottomPanelContainer(this);
        this.bottomPanel.initialize();
        this.add.existing(this.bottomPanel);
        this.bottomPanel.setPosition(this.game.scale.width, this.game.scale.height);
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
            `Voters: ${tile.numberOfVoters}`,
            `Voters Secured: ${tile.totalOccupied()}`,
            `Worker On Tile: ${tile.workerOnTile}`,
            `Political Stance (-1 <- Liberal Conservative -> 1):`,
            `Economy: ${tile.ecomony}`,
            `Healthcare: ${tile.healthcare}`,
            `Education: ${tile.education}`,
            `Taxes: ${tile.taxes}`,
            `Environment: ${tile.environment}`
        ]);
    }

    initializeDayDisplay()
    {
        this.dayDisplay = this.add.text(this.game.scale.width, 0, "Day: 1");
        this.dayDisplay.setFontSize(20);
        this.dayDisplay.setOrigin(1, 0);
        this.timeController = new TimeController(this, this.dayDisplay);
    }

    initializeMapController()
    {
        this.mapController = new MapController(this, this.tileMap);
    }

    initializeSidePanel()
    {
        this.sidePanel = new LeftPanelContainer(this);
        this.add.existing(this.sidePanel);
        this.sidePanel.initialize();
    }

    initializeTileObjects(tileMap)
    {
        let startX = 700;
        let startY = 110;
        let verticalDiameter = 90;
        let gapBetweenTiles = 6;
        let tileStrokeSize = 5;
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
                    let x = startX + this.polygonCalcHorizonalDiameter(verticalDiameter) * col + (gapBetweenTiles * col);
                    let y = startY + ((verticalDiameter/2)+Math.sin(30*Math.PI/180)*(verticalDiameter/2)) * row + (gapBetweenTiles * row);
                    if(row % 2 == 1)
                    {
                        x += Math.cos(30*Math.PI/180) * verticalDiameter /2 + gapBetweenTiles / 2;
                    }
                    //let color = col % 2 == 1 ? 0xffffff: 0xaaaaaa;
                    let color = 0xeeeeee;
                    let hexagon = this.add.polygon(x, y, points, color);
                    hexagon.setOrigin(0.5, 0.5);
                    hexagon.setStrokeStyle(tileStrokeSize, 0xaaaaaa);
                    hexagon.setInteractive(hitarea, Phaser.Geom.Polygon.Contains);
                    //let scale = chroma.scale(["white", "blue"]);
                    //chroma('#D4F880').darken().hex();
                    hexagon.updateView = function(tile) { 
                        let percentageOccupied = tile.percentageOccupied();
                        if(tile.workerOnTile)
                        {
                            //console.log("Set stroke color");
                            this.setStrokeStyle(tileStrokeSize, 0x37ed98);
                        }
                        if(percentageOccupied == 1)
                        {
                            //this.setStrokeStyle(2, 0x5555ee);
                        }
                        else
                        {
                            //this.setStrokeStyle(2, 0xaaaaaa);
                            
                        }
                        let colorScale = chroma.scale(['eeeeee', 'blue']);
                        let hexNum = parseInt(colorScale(percentageOccupied).toString().substring(1), 16);
                        //console.log(percentageOccupied, hexNum);
                        this.setFillStyle(hexNum);
                    }
                    hexagon.on("pointerover", () => {
                        hexagon.setAlpha(0.8);
                        this.drawTile(this.tileMap.getTileAt(row,col));
                    });
                    hexagon.on("pointerout", ()=>{
                        hexagon.setAlpha(1);
                    });
                    hexagon.on("pointerdown", ()=>{
                        let tile = this.tileMap.getTileAt(row, col);
                        tile.addWorkerToTile();
                        console.log("Pressed");
                    })
                    tileMap[row][col].setView(hexagon);
                    this.tileMapTiles[row][col] = hexagon;
                }
            }
        }
    }
}