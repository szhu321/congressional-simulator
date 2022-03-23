import Phaser from "phaser";
import ClickerModel from "../models/ClickerModel";
import ClickerController from "../controllers/ClickerController";
import ClickerView from "../views/ClickerView";
import WorkerModel from "../models/WorkerModel";
import WorkerView from "../views/WorkerView";
import UpgradeModel from "../models/UpgradeModel";
import UpgradeView from "../views/UpgradeView";
import { SCENE_CONFIG } from "../../gameconfig";

export default class ClickerScene extends Phaser.Scene{
    preload(){
        this.model;
        this.view;
        this.controller;
    }

    create(){
        this.initializeBackground();
        this.initializeCamera();

        this.model = this.createClickerModel();
        this.controller = new ClickerController();
        this.view = new ClickerView(this);

        this.model.setView(this.view);
        this.view.setController(this.controller);
        this.controller.setModel(this.model);

        this.view.initialize(this.model);

        this.add.existing(this.view);

        this.controller.startAutomatedRevenue();
    }

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

    createClickerModel(){
        let model = new ClickerModel();
        let clickerData = this.getClickerData();
        this.createWorkersandUpgrades(clickerData, model);
        return model;
    }

    createWorkersandUpgrades(clickerData, model){
        for(let i = 0; i < clickerData.workers.length; i++){
            let newWorker = clickerData.workers[i];
            let newWorkerModel = new WorkerModel(newWorker.name, newWorker.revenueRate / 60, newWorker.cost);
            let newWorkerView = new WorkerView(this);
            newWorkerView.initialize();
            newWorkerModel.setView(newWorkerView);
            newWorkerView.updateDisplay();
            newWorkerView.setInteractive({hitArea: new Phaser.Geom.Rectangle(-1 * newWorkerView.maxWidth / 2, 
            -1 * newWorkerView.maxHeight / 2, newWorkerView.maxWidth, newWorkerView.maxHeight), hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
        useHandCursor: true});
            newWorkerModel.updateView();
            model.addWorker(newWorkerModel);
        }

        for(let i = 0; i < clickerData.upgrades.length; i++){
            let newUpgrade = clickerData.upgrades[i];
            let newUpgradeModel = new UpgradeModel(newUpgrade.name, newUpgrade.multiplier, newUpgrade.cost, newUpgrade.description, newUpgrade.target);
            let newUpgradeView = new UpgradeView(this);
            newUpgradeView.initialize();
            newUpgradeModel.setView(newUpgradeView);
            newUpgradeView.updateDisplay();
            newUpgradeView.setInteractive({hitArea: new Phaser.Geom.Rectangle(-1 * newUpgradeView.maxWidth / 2, 
            -1 * newUpgradeView.maxHeight / 2, newUpgradeView.maxWidth, newUpgradeView.maxHeight), hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
        useHandCursor: true});
            newUpgradeModel.updateView();
            model.addUpgrade(newUpgradeModel);
        }
    }

    getClickerData(){
        // fetch("../ClickerData.json")
        // .then(response => response.text())
        // .then(json => console.log(json));

        let clickerData = {
            workers: [
                {
                    name: "Cold Caller",
                    revenueRate: 0.1,
                    cost: 10
                },
                {
                    name: "Leafleter",
                    revenueRate: 1,
                    cost: 30
                }
            ],
            upgrades: [
                {
                    name: "Office Equipment",
                    cost: 250,
                    description: "Cold Callers are 2x more effective",
                    target: 1,
                    multiplier: 2
                },
                {
                    name: "Demographic Targeting",
                    cost: 500,
                    description: "Leafleters are 2x more effective",
                    target: 2,
                    multiplier: 2
                }
            ]
        };

        return clickerData;
    }
}