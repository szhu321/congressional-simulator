import { CAMPAIGN_EVENTS } from "../campaignenum";
import CampaignEventDispatcher from "../CampaignEventDispatcher";
import TileMapController from "../controller/TileMapController";
import TileMap from "../model/TileMap";
import TileView from "./TileView";

/**
 * Responsible for:
 * - Displaying the hexagonal tiles.
 * - Highlight the tile that is selected.
 * - Zoom and pan on the map.
 */
export default class TileMapView extends Phaser.GameObjects.Container
{
    private selectedTile: {row: number, col: number};
    private tileMapViews: TileView[][];
    private selectedHexagonOverlay: Phaser.GameObjects.Polygon;
    private tileMapController: TileMapController;
    private background: Phaser.GameObjects.Rectangle;
    
    private isDragging: boolean;
    private dragStartX: number;
    private dragStartY: number;

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        this.setActive(true);
        this.selectedTile = {row: -1, col: -1};
        this.isDragging = false;
        this.initializeBackground();
        this.initializeDraggingZooming();
        this.initializeSelectedHexagonOverlay();
        
        //this.tileMapTiles;
        CampaignEventDispatcher.getInstance().on(CAMPAIGN_EVENTS.CAMPAIGN_SELECTED_TILE, (row: number, col: number) => {
            if(this.selectedTile.row === row && this.selectedTile.col === col)
            {
                this.selectedTile.row = -1;
                this.selectedTile.col = -1;
            }
            else
            {
                this.selectedTile.row = row;
                this.selectedTile.col = col;
            }
            //console.log(this.selectedTile, row, col);
        })

        CampaignEventDispatcher.getInstance().on(CAMPAIGN_EVENTS.CAMPAIGN_ADD_WORKER, (worker: any) => {
            if(this.selectedTile.row !== -1)
            {
                this.tileMapController.addWorkerToTile(this.selectedTile.row, this.selectedTile.col);
            }
        })
    }

    public setTileMapController(tileMapController: TileMapController) {this.tileMapController = tileMapController;} 
    public getTileMapController(): TileMapController {return this.tileMapController;}

    preUpdate(time: number, deltaT: number)
    {
        //console.log("Updating");
        if(this.selectedTile.row !== -1)
        {
            let tileView = this.tileMapViews[this.selectedTile.row][this.selectedTile.col];
            this.selectedHexagonOverlay.setVisible(true);
            //console.log(tileView.x, tileView.y);
            this.selectedHexagonOverlay.setPosition(tileView.x, tileView.y);
        }
        else
        {
            //this.clearSidePanel();
            this.selectedHexagonOverlay.setVisible(false);
        }
    }

    public setTileMapViews(value: TileView[][])
    {
        this.tileMapViews = value;
        //add all the tiles to this container.
        value.forEach((tiles: TileView[]) => {
            tiles.forEach((tile: TileView) => {
                this.add(tile);
            })
        })
    }

    drawMap(tileMap: TileMap, mode: number = 0)
    {
        if(tileMap && mode) //PLACEHOLDER.
        {
            
        }
    }

    private initializeDraggingZooming()
    {
        let width = this.background.width;
        let height = this.background.height;
        let hitarea = new Phaser.Geom.Rectangle(0, 0, width, height);
        this.setInteractive({
            hitArea: hitarea, 
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true});
        
        this.scene.input.setDraggable(this);
        this.input.draggable = true;

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
            if(pointer.rightButtonDown())
            {
                this.dragStartX = pointer.position.x - this.x;
                this.dragStartY = pointer.position.y - this.y;
                this.isDragging = true;
                console.log("RIGHT BUTTON DOWN");
            }
                
            // console.log(pointer);
            // console.log("dragstart:");
            // console.log(pointer);
            // console.log(dragX);
            // console.log(dragY);
        });
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_MOVE, (pointer: Phaser.Input.Pointer) => {
            if(pointer.rightButtonDown() && this.isDragging)
            {
                let dragX = pointer.position.x - this.dragStartX;
                let dragY = pointer.position.y - this.dragStartY;
                this.setPosition(dragX, dragY); 
            }
            // console.log("rightbuttondown: " + this.scene.input.mousePointer.rightButtonDown());
            // console.log(pointer);
            // console.log(dragX + " " + dragY);
        });
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, (pointer: Phaser.Input.Pointer) => {
            this.isDragging = false;
        });
    }

    private initializeBackground()
    {
        this.background = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 1000, 1000, 0x2fa83d);
        this.add(this.background);
        this.background.setOrigin(0, 0);
        this.background.setDepth(-1);
        this.scene.add.existing(this.background);
    }

    private initializeSelectedHexagonOverlay()
    {
        let selectedStrokeColor = 0xedeb4e;
        let verticalDiameter = 90;
        let tileStrokeSize = 10;
        let points = this.polygonPoints(verticalDiameter);
        this.selectedHexagonOverlay = new Phaser.GameObjects.Polygon(this.scene, 0, 0, points, 0x000000, 0);
        this.selectedHexagonOverlay.setOrigin(0.5, 0.5);
        this.selectedHexagonOverlay.setStrokeStyle(tileStrokeSize, selectedStrokeColor, 1);
        this.selectedHexagonOverlay.setVisible(false);
        this.selectedHexagonOverlay.setDepth(2);
        this.bringToTop(this.selectedHexagonOverlay);
        this.scene.add.existing(this.selectedHexagonOverlay);
        this.add(this.selectedHexagonOverlay);
    }

    // addWorkerAtSelectedTile()
    // {
    //     if(this.selectedTile && this.selectedTile.row !== -1)
    //     {
    //         let row = this.selectedTile.row;
    //         let col = this.selectedTile.col;
    //         let tile = this.tileMap.getTileAt(row, col);
    //         tile.addWorkerToTile(null);
    //     }
    // }

    deselectTile()
    {
        this.selectedTile.row = -1;
        this.selectedTile.col = -1;
    }

    public setSelectedTile(value: {row: number, col: number})
    {
        this.selectedTile = value;
    }

    public getSelectedTile(): {row: number, col: number}
    {
        return this.selectedTile;
    }

    // private initializeTileObjects(tileMap: TileMap)
    // {
    //     let startX = 700;
    //     let startY = 110;
    //     let verticalDiameter = 90;
    //     let gapBetweenTiles = 6;
    //     let tileStrokeSize = 5;
    //     let points = this.polygonPoints(verticalDiameter);
    //     let hitarea = new Phaser.Geom.Polygon(points);
    //     this.tileMapTiles = new Array(tileMap.length);
    //     for(let i = 0; i < tileMap.length; i++)
    //     {
    //         this.tileMapTiles[i] = new Array(tileMap[i].length);
    //     }

    //     //selected hexagon
    //     let selectedStrokeColor = 0xedeb4e;
    //     this.selectedHexagonOverlay = this.add.polygon(0, 0, points, 0x000000, 0.1);
    //     this.selectedHexagonOverlay.setOrigin(0.5, 0.5);
    //     this.selectedHexagonOverlay.setStrokeStyle(tileStrokeSize, selectedStrokeColor);
    //     this.selectedHexagonOverlay.setVisible(false);
    //     this.selectedHexagonOverlay.setDepth(2);

    //     for(let row = 0; row < tileMap.length; row++)
    //     {
    //         for(let col = 0; col < tileMap[row].length; col++)
    //         {
    //             if(tileMap[row][col] != null)
    //             {
    //                 let x = startX + this.polygonCalcHorizonalDiameter(verticalDiameter) * col + (gapBetweenTiles * col);
    //                 let y = startY + ((verticalDiameter/2)+Math.sin(30*Math.PI/180)*(verticalDiameter/2)) * row + (gapBetweenTiles * row);
    //                 if(row % 2 == 1)
    //                 {
    //                     x += Math.cos(30*Math.PI/180) * verticalDiameter /2 + gapBetweenTiles / 2;
    //                 }
    //                 //let color = col % 2 == 1 ? 0xffffff: 0xaaaaaa;
    //                 let color = 0xeeeeee;
    //                 let hexagon = new TileView(this, x, y, points, color, row, col);
    //                 this.add.existing(hexagon);
    //                 tileMap[row][col].setView(hexagon);
    //                 this.tileMapTiles[row][col] = hexagon;
    //             }
    //         }
    //     }
    // }

    polygonPoints(verticalDiameter: number): any
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

    

}
