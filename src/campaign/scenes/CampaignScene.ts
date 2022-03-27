import 'phaser';
import chroma = require('chroma-js');
import TileMapController from "../controller/TileMapController";
import TimeController from "../controller/TimeController";
import TileMap from "../model/TileMap";
import LeftPanelContainer from "../view/LeftPanelContainer";
import BottomPanelContainer from "../view/BottomPanelContainer";
import { SCENE_CONFIG } from "../../gameconfig";
import TileView from '../view/TileView';
import Tile from '../model/Tile';
import TileMapView from '../view/TileMapView';
import TileMapFactory, { TileMapType } from '../factory/TileMapFactory';

export default class CampaignScene extends Phaser.Scene
{
    private screenSize: Phaser.Scale.ScaleManager;
    private sidePanel: LeftPanelContainer;
    private dayDisplay: Phaser.GameObjects.Text;
    private bottomPanel: BottomPanelContainer;
     
    //TileMap MVC
    private tileMap: TileMap;
    private tileMapView: TileMapView;
    private tileMapController: TileMapController;
    
    private timeController: TimeController;

    preload()
    {
        this.screenSize = this.game.scale;   
        this.sidePanel;
        this.dayDisplay;
        //this.mapController;
        this.bottomPanel;
    }

    create()
    {
        //used to size the scene camera correctly because of the menu on the top.
        this.initializeCamera();
        this.initializeBackground();
        this.initializeSidePanel();
        this.initializeDayDisplay();
        //this.initializeMapController();
        this.initializeBottomPanel();
        // this.add.text(200, 200, 'Hello World');
        // let polygon = this.add.polygon(300, 300, this.polygonPoints(100), 0xffffff);
        // polygon.setOrigin(0.5, 0.5);
        // let polygon2 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100), 300, this.polygonPoints(100), 0xaaaaaa);
        // polygon2.setOrigin(0.5, 0.5);
        // let polygon3 = this.add.polygon(300 + this.polygonCalcHorizonalDiameter(100) * 2, 300, this.polygonPoints(100), 0xffffff);
        // polygon3.setOrigin(0.5, 0.5);

        //this.tileMap.setViews(this);
        this.tileMap = TileMapFactory.getTileMap(this, TileMapType.DEFAULT);
    }

    update()
    {
        //TODO: Event system for the sidepanel.
        // if(this.selectedTile && this.selectedTile.row !== -1)
        // {
        //     let tileView = this.tileMapTiles[this.selectedTile.row][this.selectedTile.col];
        //     this.selectedHexagonOverlay.setVisible(true);
        //     this.selectedHexagonOverlay.setPosition(tileView.x, tileView.y);
        //     //let tile = this.tileMap.getTileAt(row, col);
        //     this.drawTile(this.tileMap.getTileAt(this.selectedTile.row,this.selectedTile.col));
        //     //tile.addWorkerToTile();
        // }
        // else
        // {
        //     this.clearSidePanel();
        //     this.selectedHexagonOverlay.setVisible(false);
        // }
    }

    public getTileMapController(): TileMapController{return this.tileMapController;}

    initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }

    initializeBottomPanel()
    {
        this.bottomPanel = new BottomPanelContainer(this);
        this.add.existing(this.bottomPanel);
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.bottomPanel.setPosition(width, height);
    }

    

    // drawMap(tileMap, displayMode)
    // {
    //     if(!this.tileMapTiles)
    //         this.initializeTileObjects(tileMap);
    // }

    // drawTile(tile: Tile)
    // {
    //     if(!this.sidePanel)
    //         this.initializeSidePanel();
    //     this.updateSidePanel(tile);
    // }
    
    clearSidePanel()
    {
        this.sidePanel.updateDisplay([]);
    }

    

    initializeDayDisplay()
    {
        this.dayDisplay = this.add.text(this.game.scale.width, 0, "Day: 1");
        this.dayDisplay.setFontSize(20);
        this.dayDisplay.setOrigin(1, 0);
        this.timeController = new TimeController(this, this.dayDisplay);
    }

    initializeSidePanel()
    {
        this.sidePanel = new LeftPanelContainer(this);
        this.add.existing(this.sidePanel);
    }
}