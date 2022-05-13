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
import EventDispatcher from '../../events/EventDispatcher';
import { DAY_SPEED, GAME_EVENTS } from '../../gameenums';
import PlayerData from '../../data/PlayerData';
import { CAMPAIGN_EVENTS, CANDIDATE } from '../campaignenum';
import Popup from '../../phaserobjs/Popup';
import Content from '../../phaserobjs/Content';
import Statistics from '../../data/statistics/Statistics';
import TextContent from '../../phaserobjs/TextContent';
import Button from '../../phaserobjs/Button';
import CampaignEventDispatcher from '../CampaignEventDispatcher';

export default class CampaignScene extends Phaser.Scene
{
    private sidePanel: LeftPanelContainer;
    //private dayDisplay: Phaser.GameObjects.Text;
    private bottomPanel: BottomPanelContainer;
     
    //TileMap MVC
    private tileMap: TileMap;
    private tileMapView: TileMapView;
    private tileMapController: TileMapController;
    
    private timeController: TimeController;

    private yourVotesDisplay: Phaser.GameObjects.Text;
    private opponentVotesDisplay: Phaser.GameObjects.Text;

    private updateTimePassed: number;
    private numberOfMSBeforeUpdate: number;

    private popupWindow: Popup;

    private giveUpButton: Button;

    preload()
    {  
        
    }

    create()
    {
        //used to size the scene camera correctly because of the menu on the top.
        this.initializeBackground();
        this.initializeTileMap();
        this.initializeSidePanel();
        this.initializeTopRightDisplay();
        this.initializeBottomPanel();
        this.input.setTopOnly(false);
        this.input.mouse.disableContextMenu();

        this.updateTimePassed = 0;
        this.numberOfMSBeforeUpdate = 200;

        this.initializePopupWindow();
        //this.scene.setActive(true);
        this.initializeCamera();
        this.tileMapView.setScale(1, 1);

        CampaignEventDispatcher.getInstance().on(CAMPAIGN_EVENTS.DISPLAY_TEXT_POPUP, (text: string) => {
            //create a popup with the specifed text.
            let content = new TextContent(this, 100, 100, 1000, 500);
            content.setText(text);
            this.popupWindow.setContent(content);
            this.popupWindow.showPopup();
        })
    }
 
    private initializePopupWindow()
    {
        this.popupWindow = new Popup(this);
        //create the content of the popup.
        let content = new TextContent(this, 100, 100, 1000, 500);
        let textContent = `
        Welcome to campaigning.\n\n
        Your goal is to have more voters on your side when the general elections starts(day 730).\n
        To send a worker, click on a tile on the map to select it, 
        then press on a worker on the bottom panel to send them.
        Note that you would need enough money to send the worker.\n
        Do be fast, before your opponent takes away all the voters.
        `
        // let textObj = new Phaser.GameObjects.Text(this, 0, 0, textContent, {});
        // textObj.setOrigin(0.5, 0.5);
        // textObj.setAlign("center");
        // content.add(textObj);
        content.setText(textContent);

        this.popupWindow.setContent(content);
        this.popupWindow.showPopup();
    }

    private initializeTileMap()
    {
        let district = Statistics.getInstance().getDistrictDatas();
        this.tileMap = TileMapFactory.getTileMap(this, TileMapType.SMALL, district[0]);
        //this.tileMap.getView().setDepth(-5);
        this.tileMapView = this.tileMap.getView();
        this.tileMapController = this.tileMap.getView().getTileMapController();
    }

    update(time: number, delta: number): void {
        this.updateTimePassed += delta;
        if(this.updateTimePassed > this.numberOfMSBeforeUpdate)
        {
            this.updateTimePassed = 0;
            EventDispatcher.getInstance().emit(GAME_EVENTS.UPDATE_GLOBAL_CAMPAIGN_DATA);
            let playerVotes = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.PLAYER);
            let opponentVotes = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.OPPONENT);

            this.yourVotesDisplay.setText(`You: ${playerVotes} Votes`);
            this.opponentVotesDisplay.setText(`Opponent: ${opponentVotes} Votes`)
        }
    }

    // update
    // update()
    // {
    //     //Event system for the sidepanel.
    //     //console.log("Campaign Scene Updating");
        
    //     this.yourVotesDisplay.setText("You: 0 Votes");
    //     this.opponentVotesDisplay.setText("Opponent: 0 Votes")
    // }

    public getTileMapController(): TileMapController{return this.tileMapController;}

    private initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
        //this.cameras.main.ignore(this.tileMapView);

        //let mapCamera = this.cameras.add(x, y, width, height);
        //mapCamera.ignore([this.sidePanel, this.bottomPanel, this.dayDisplay, this.yourVotesDisplay, this.opponentVotesDisplay, this.popupWindow]);

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

    private initializeTopRightDisplay()
    {
        // this.dayDisplay = this.add.text(this.game.scale.width, 0, "Day: 1");
        // this.dayDisplay.setFontSize(20);
        // this.dayDisplay.setOrigin(1, 0);
        this.timeController = new TimeController(this);

        this.yourVotesDisplay = this.add.text(SCENE_CONFIG.scene_width, 20, "You: 0 Votes");
        this.yourVotesDisplay.setFontSize(20);
        this.yourVotesDisplay.setOrigin(1, 0);

        this.opponentVotesDisplay = this.add.text(SCENE_CONFIG.scene_width, 40, "Opponent: 0 Votes");
        this.opponentVotesDisplay.setFontSize(20);
        this.opponentVotesDisplay.setOrigin(1, 0);

        
        this.giveUpButton = new Button(this, SCENE_CONFIG.scene_width - 70, 80, 100, 20);
        this.giveUpButton.getText().setText("Give Up");
        this.giveUpButton.setOnclickCallback(() => {
            EventDispatcher.getInstance().emit(GAME_EVENTS.CHANGE_GAME_DAY_SPEED, DAY_SPEED.FASTER_THAN_FASTEST);
        });
        this.add.existing(this.giveUpButton);
    }

    private initializeSidePanel()
    {
        this.sidePanel = new LeftPanelContainer(this);
        this.add.existing(this.sidePanel);
    }
}