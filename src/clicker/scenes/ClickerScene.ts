import "phaser";
import ClickerModel from "../models/ClickerModel";
import ClickerController from "../controllers/ClickerController";
import ClickerView from "../views/ClickerView";
import WorkerModel from "../models/WorkerModel";
import WorkerView from "../views/WorkerView";
import UpgradeModel from "../models/UpgradeModel";
import UpgradeView from "../views/UpgradeView";
import { SCENE_CONFIG } from "../../gameconfig";

export default class ClickerScene extends Phaser.Scene{
    private model: ClickerModel;
    private view: ClickerView;
    private controller: ClickerController;

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
    }

    update(time: number, delta: number){
        this.controller.passTime(delta);
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

    createWorkersandUpgrades(clickerData: ClickerData, model: ClickerModel){
        for(let i = 0; i < clickerData.workers.length; i++){
            let newWorker = clickerData.workers[i];
            let newWorkerModel = new WorkerModel(newWorker.name, newWorker.revenueRate, newWorker.cost);
            let newWorkerView = new WorkerView(this);
            newWorkerView.initialize();
            newWorkerModel.setView(newWorkerView);
            newWorkerView.updateDisplay();
            newWorkerView.setInteractive({hitArea: new Phaser.Geom.Rectangle(-1 * newWorkerView.getMaxWidth() / 2, 
            -1 * newWorkerView.getMaxHeight() / 2, newWorkerView.getMaxWidth(), newWorkerView.getMaxHeight()), hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
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
            newUpgradeView.setInteractive({hitArea: new Phaser.Geom.Rectangle(-1 * newUpgradeView.getMaxWidth() / 2, 
            -1 * newUpgradeView.getMaxHeight() / 2, newUpgradeView.getMaxWidth(), newUpgradeView.getMaxHeight()), hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
        useHandCursor: true});
            newUpgradeModel.updateView();
            model.addUpgrade(newUpgradeModel);
        }
    }

    getClickerData(){
        let clickerData = new ClickerData();
        clickerData.workers.push(new WorkerData("Cold Caller", 0.1, 10));
        clickerData.workers.push(new WorkerData("Leafleter", 1, 30));
        clickerData.upgrades.push(new UpgradeData("Office Equipment", 2, 250, "Cold Callers are 2x more effective", 1));
        clickerData.upgrades.push(new UpgradeData("Demographic Targeting", 2, 500, "Leafleters are 2x more effective", 2));

        return clickerData;
    }
}

class ClickerData{
    workers: WorkerData[];
    upgrades: UpgradeData[];

    constructor(){
        this.workers = [];
        this.upgrades = [];
    }
}

class WorkerData{
    name: string;
    revenueRate: number;
    cost: number;

    constructor(name: string, revenueRate: number, cost: number){
        this.name = name;
        this.revenueRate = revenueRate;
        this.cost = cost;
    }
}

class UpgradeData{
    name: string;
    multiplier: number;
    cost: number;
    description: string;
    target: number;

    constructor(name: string, multiplier: number, cost: number, description: string, target: number){
        this.name = name;
        this.multiplier = multiplier;
        this.cost = cost;
        this.description = description;
        this.target = target;
    }
}