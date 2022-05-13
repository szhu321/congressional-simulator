import "phaser";
import FundraiseModel from "../models/FundraiseModel";
import FundraiseController from "../controllers/FundraiseController";
import FundraiseView from "../views/FundraiseView";
import WorkerModel from "../models/WorkerModel";
import WorkerView from "../views/WorkerView";
import UpgradeModel from "../models/UpgradeModel";
import UpgradeView from "../views/UpgradeView";
import { SCENE_CONFIG } from "../../gameconfig";

export default class FundraiseScene extends Phaser.Scene{
    private model: FundraiseModel;
    private view: FundraiseView;
    private controller: FundraiseController;

    preload(){
        this.load.image('money', 'assets/money1.png');
        this.load.image('phone', 'assets/phone.png');
        this.load.audio('call1', 'assets/call_button_sound.mp3');
        this.load.audio('call2', 'assets/call_button_sound_2.mp3');
        this.load.audio('call3', 'assets/call_button_sound_3.mp3');
    }

    create(){
        this.initializeBackground();
        this.initializeCamera();

        this.model = this.createFundraiseModel();
        this.controller = new FundraiseController();
        this.view = new FundraiseView(this);

        this.model.setView(this.view);
        this.view.setController(this.controller);
        this.controller.setModel(this.model);

        let workerDescriptions = this.createWorkerDescriptions();
        this.view.createWorkerDescriptions(workerDescriptions);

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

    createFundraiseModel(){
        let model = new FundraiseModel();
        let fundraiseData = this.getFundraiseData();
        this.createWorkersandUpgrades(fundraiseData, model);
        return model;
    }

    createWorkersandUpgrades(fundraiseData: FundraiseData, model: FundraiseModel){
        for(let i = 0; i < fundraiseData.workers.length; i++){
            let newWorker = fundraiseData.workers[i];
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

        for(let i = 0; i < fundraiseData.upgrades.length; i++){
            let newUpgrade = fundraiseData.upgrades[i];
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

    getFundraiseData(){
        let fundraiseData = new FundraiseData();
        fundraiseData.workers.push(new WorkerData("Cold Caller", 0.1, 10));
        fundraiseData.workers.push(new WorkerData("Leafleter", 1, 80));
        fundraiseData.workers.push(new WorkerData("Poster Designer", 7, 500));
        fundraiseData.workers.push(new WorkerData("Street Fundraiser", 45, 2600));
        fundraiseData.workers.push(new WorkerData("Merchandise Designer", 310, 14000));
        fundraiseData.workers.push(new WorkerData("Yard Sign Designer", 2100, 71000));
        fundraiseData.workers.push(new WorkerData("Social Media Content Creator", 14500, 356000));
        fundraiseData.workers.push(new WorkerData("Event Coordinator", 101000, 1790000));
        fundraiseData.workers.push(new WorkerData("Marketer", 700000, 8960000));
        fundraiseData.workers.push(new WorkerData("Pollster", 4500000, 44900000));
        fundraiseData.workers.push(new WorkerData("Political Analyst", 31000000, 224600000));
        
        fundraiseData.upgrades.push(new UpgradeData("Campaign Website", 2, 100, "Text/Call is 2x more effective", 0));
        fundraiseData.upgrades.push(new UpgradeData("Office Equipment", 2, 100, "Cold Callers are 2x more effective", 1));
        fundraiseData.upgrades.push(new UpgradeData("Demographic Targeting", 2, 800, "Leafleters are 2x more effective", 2));
        fundraiseData.upgrades.push(new UpgradeData("Campaign Slogan", 2, 5000, "Poster Designers are 2x more effective", 3));
        fundraiseData.upgrades.push(new UpgradeData("Campaign Pitch", 2, 26000, "Street Fundraisers are 2x more effective", 4));
        fundraiseData.upgrades.push(new UpgradeData("Improved Sewing Machines", 2, 140000, "Merchandise Designers are 2x more effective", 5));
        fundraiseData.upgrades.push(new UpgradeData("Vinyl Banners", 2, 710000, "Yard Sign Designers are 2x more effective", 6));
        fundraiseData.upgrades.push(new UpgradeData("Improved Recording Equipment", 2, 3560000, "Social Media Content Creators are 2x more effective", 7));
        fundraiseData.upgrades.push(new UpgradeData("Celebrity Artists", 2, 17900000, "Event Coordinators are 2x more effective", 8));
        fundraiseData.upgrades.push(new UpgradeData("Native Advertising", 2, 89600000, "Marketers are 2x more effective", 9));
        fundraiseData.upgrades.push(new UpgradeData("Raffle Tickets", 2, 449000000, "Pollsters are 2x more effective", 10));
        fundraiseData.upgrades.push(new UpgradeData("Machine Learning", 2, 2246000000, "Political Analysts are 2x more effective", 11));

        return fundraiseData;
    }

    createWorkerDescriptions(){
        let workerDescriptions = ['Cold Callers call residents and ask them to support the campaign by donating',
            'Leafleters hand out leaflets and flyers to people on the street that tell them about the campaign',
            'Poster Designers create posters that they place around the area to promote the campaign',
            'Street Fundraisers talk to people directly on the street or by walking door-to-door and asking them to support the campaign',
            'Merchandise Designers create designs for merchandise (e.g. hats, shirts, mugs, etc) to sell and spread awareness about the campaign',
            'Yard Sale Designers create and sell yard signs to put around residents\u{2019} homes to promote the campaign',
            'Social Media Content Creators create photos, videos, and other content to upload on social media accounts to garner support for the campaign',
            'Event Coordinators organize events like fundraisers and luncheons as ways for people to meet with the candidate',
            'Marketers create advertisements to promote the campaign',
            'Pollsters design surveys to give to the public and gather data from the results',
            'Political Analysts research various political subjects and analyze data to forecast and understand political trends'];
        return workerDescriptions;
    }
}

class FundraiseData{
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