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
        
    }

    create()
    {
        //used to size the scene camera correctly because of the menu on the top.
        this.initializeCamera();
        this.initializeBackground();
        this.initializeTileMap();
        this.initializeSidePanel();
        this.initializeDayDisplay();
        this.initializeBottomPanel();
        this.input.setTopOnly(false);
        this.input.mouse.disableContextMenu();
        //this.scene.setActive(true);
    }

    private initializeTileMap()
    {
        this.tileMap = TileMapFactory.getTileMap(this, TileMapType.DEFAULT);
        //this.tileMap.getView().setDepth(-5);
        this.tileMapView = this.tileMap.getView();
        this.tileMapController = this.tileMap.getView().getTileMapController();
    }

    update()
    {
        //Event system for the sidepanel.
        //console.log("Campaign Scene Updating");
    }

    public getTileMapController(): TileMapController{return this.tileMapController;}

    private initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    private initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }

    private initializeBottomPanel()
    {
        this.bottomPanel = new BottomPanelContainer(this);
        this.add.existing(this.bottomPanel);
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.bottomPanel.setPosition(width, height);
    }

    private initializeDayDisplay()
    {
        this.dayDisplay = this.add.text(this.game.scale.width, 0, "Day: 1");
        this.dayDisplay.setFontSize(20);
        this.dayDisplay.setOrigin(1, 0);
        this.timeController = new TimeController(this, this.dayDisplay);
    }

    private initializeSidePanel()
    {
        this.sidePanel = new LeftPanelContainer(this);
        this.add.existing(this.sidePanel);
    }
}