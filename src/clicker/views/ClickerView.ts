import "phaser";
import PlayerData from "../../data/PlayerData";
import ClickerController from "../controllers/ClickerController";
import ClickerModel from "../models/ClickerModel";
import UpgradeView from "./UpgradeView";
import WorkerView from "./WorkerView";
import millify from "millify";

export default class ClickerView extends Phaser.GameObjects.Layer{
    private controller: ClickerController;
    private workerViews: WorkerView[];
    private upgradeViews: UpgradeView[];
    private buttonColor: number;
    private buttonColorDark: number;
    private workersPerPage: number;
    private upgradesPerPage: number;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.controller = null;
        this.workerViews = [];
        this.upgradeViews = [];
        this.buttonColor = 0xf7e9c3;
        this.buttonColorDark = 0xaba187;
        this.workersPerPage = 7;
        this.upgradesPerPage = 5;
    }

    setController(initController: ClickerController){
        this.controller = initController;
    }

    getWorkersPerPage(){
        return this.workersPerPage;
    }

    getUpgradesPerPage(){
        return this.upgradesPerPage;
    }

    initialize(model: ClickerModel){
        let money = this.scene.add.particles('money');
        let moneyEmitter = money.createEmitter({
            scale: { min: 0.1, max: 0.5 },
            speed: { min: 100, max: 200 },
            quantity: 0.1,
            frequency: 1,
            lifespan: 1000,
            gravityY: 100,
            on: false,
        });

        let statsText = this.scene.add.text(75, 50, [`Stats`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let currentFundsText = this.scene.add.text(75, 150, [`Current Funds: $${millify(PlayerData.getPlayer().getMoney(), {
            precision: 2
          })}`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let rateOfRevenueText = this.scene.add.text(75, 250, [`Automated Rate of Revenue: $${millify(model.getRevenueRate(), {
            precision: 2
          })}/sec`]).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let workersText = this.scene.add.text(571, 50, [`Workers`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        let upgradesText = this.scene.add.text(1013, 50, [`Upgrades`]).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');

        let clickCallRect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        let clickCallText = this.scene.add.text(80, 350, [`Text/Call`]).setFontSize(18).setColor('black');
        let clickCallBounds = clickCallText.getBounds();
        clickCallRect.setSize(clickCallBounds.width + 10, clickCallBounds.height + 10);
        clickCallRect.setPosition(clickCallText.getCenter().x - clickCallRect.width / 2, clickCallText.getCenter().y - clickCallRect.height / 2);
        clickCallRect.setInteractive({useHandCursor: true});

        moneyEmitter.setPosition(clickCallRect.getCenter().x, clickCallRect.getCenter().y);

        clickCallRect.on('pointerup', () => {
            this.controller.processClickCallText();
            moneyEmitter.emitParticle(1, clickCallRect.getCenter().x, clickCallRect.getCenter().y);
        })

        let workerNextRect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        let workerNextText = this.scene.add.text(726, 60, [`Next`]).setFontSize(18).setColor('black');
        let workerNextBounds = workerNextText.getBounds();
        workerNextRect.setSize(workerNextBounds.width + 10, workerNextBounds.height + 10);
        workerNextRect.setPosition(workerNextText.getCenter().x - workerNextRect.width / 2, workerNextText.getCenter().y - workerNextRect.height / 2);
        workerNextRect.setInteractive({useHandCursor: true});

        workerNextRect.on('pointerup', () => {
            this.controller.processWorkerNextPage();
        })

        let workerPrevRect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        let workerPrevText = this.scene.add.text(480, 60, [`Prev`]).setFontSize(18).setColor('black');
        let workerPrevBounds = workerPrevText.getBounds();
        workerPrevRect.setSize(workerPrevBounds.width + 10, workerPrevBounds.height + 10);
        workerPrevRect.setPosition(workerPrevText.getCenter().x - workerPrevRect.width / 2, workerPrevText.getCenter().y - workerPrevRect.height / 2);
        workerPrevRect.setInteractive({useHandCursor: true});

        workerPrevRect.on('pointerup', () => {
            this.controller.processWorkerPrevPage();
        })

        let upgradeNextRect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        let upgradeNextText = this.scene.add.text(1176, 60, [`Next`]).setFontSize(18).setColor('black');
        let upgradeNextBounds = upgradeNextText.getBounds();
        upgradeNextRect.setSize(upgradeNextBounds.width + 10, upgradeNextBounds.height + 10);
        upgradeNextRect.setPosition(upgradeNextText.getCenter().x - upgradeNextRect.width / 2, upgradeNextText.getCenter().y - upgradeNextRect.height / 2);
        upgradeNextRect.setInteractive({useHandCursor: true});

        upgradeNextRect.on('pointerup', () => {
            this.controller.processUpgradeNextPage();
        })

        let upgradePrevRect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        let upgradePrevText = this.scene.add.text(930, 60, [`Prev`]).setFontSize(18).setColor('black');
        let upgradePrevBounds = upgradePrevText.getBounds();
        upgradePrevRect.setSize(upgradePrevBounds.width + 10, upgradePrevBounds.height + 10);
        upgradePrevRect.setPosition(upgradePrevText.getCenter().x - upgradePrevRect.width / 2, upgradePrevText.getCenter().y - upgradePrevRect.height / 2);
        upgradePrevRect.setInteractive({useHandCursor: true});

        upgradePrevRect.on('pointerup', () => {
            this.controller.processUpgradePrevPage();
        })


        this.add(statsText);
        this.add(currentFundsText);
        this.add(rateOfRevenueText);
        this.add(clickCallRect);
        this.add(clickCallText);
        this.add(workersText);
        this.add(upgradesText);
        this.add(workerNextRect);
        this.add(workerNextText);
        this.add(workerPrevRect);
        this.add(workerPrevText);
        this.add(upgradeNextRect);
        this.add(upgradeNextText);
        this.add(upgradePrevRect);
        this.add(upgradePrevText);

        let workers = model.getWorkers();
        for(let i = 0; i < workers.length; i++){
            let workerView = workers[i].getView();
            workerView.setPosition(625, 130 + 70 * i);
            workerView.setCanPurchase(PlayerData.getPlayer().getMoney() >= workers[i].getCost());
            workerView.on('pointerup', (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
                this.controller.processPurchaseWorker(i);
            });
            this.add(workerView);
            this.workerViews.push(workerView);
        }

        let upgrades = model.getUpgrades();
        for(let i = 0; i < upgrades.length; i++){
            let upgradeView = upgrades[i].getView();
            upgradeView.setPosition(1075, 130 + 110 * i);
            upgradeView.setCanPurchase(PlayerData.getPlayer().getMoney() >= upgrades[i].getCost());
            upgradeView.on('pointerup', (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
                this.controller.processPurchaseUpgrade(upgrades.map(upgrade => upgrade.getView()).indexOf(upgradeView));
            })
            this.add(upgradeView);
            this.upgradeViews.push(upgradeView);
        }
    }

    updateViewCallback(model: ClickerModel){
        let children = this.getAll();
        let currentFundsText = children[1] as Phaser.GameObjects.Text;
        let money = PlayerData.getPlayer().getMoney();
        let moneyString = money < 1000 ? money.toFixed(2) : millify(money, {
            precision: 2
          })
        let revenueRate = model.getRevenueRate();
        let revenueRateString = revenueRate < 1000 ? revenueRate.toFixed(2) : millify(revenueRate, {
            precision: 2
          })
        currentFundsText.setText(`Current Funds: $${moneyString}`);
        
        let rateOfRevenueText = children[2] as Phaser.GameObjects.Text;
        rateOfRevenueText.setText(`Automated Rate of Revenue: $${revenueRateString}/sec`);

        for(let i = 0; i < this.workerViews.length; i++){
            this.remove(this.workerViews[i]);
        }
        this.workerViews.splice(0, this.workerViews.length);

        let workers = model.getWorkers().filter(worker => worker.getIsUnlocked());
        for(let i = 0; i < this.workersPerPage && ((i + model.getWorkerPage() * this.workersPerPage) < workers.length); i++){
            let workerView = workers[i + model.getWorkerPage() * this.workersPerPage].getView();
            workerView.setPosition(625, 130 + 70 * i);
            this.add(workerView);
            this.workerViews.push(workerView);
            workerView.setCanPurchase(PlayerData.getPlayer().getMoney() 
            >= workers[i + model.getWorkerPage() * this.workersPerPage].getCost());
        }

        let workerNextRect = children[7] as Phaser.GameObjects.Rectangle;
        if(workers.length < this.workersPerPage || (model.getWorkerPage() + 1) * this.workersPerPage >= workers.length){
            workerNextRect.disableInteractive();
            workerNextRect.setFillStyle(this.buttonColorDark);
        }else{
            workerNextRect.setInteractive();
            workerNextRect.setFillStyle(this.buttonColor);
        }

        let workerPrevRect = children[9] as Phaser.GameObjects.Rectangle;
        if(workers.length < this.workersPerPage || model.getWorkerPage() == 0){
            workerPrevRect.disableInteractive();
            workerPrevRect.setFillStyle(this.buttonColorDark);
        }else{
            workerPrevRect.setInteractive();
            workerPrevRect.setFillStyle(this.buttonColor);
        }

        for(let i = 0; i < this.upgradeViews.length; i++){
            this.remove(this.upgradeViews[i]);
        }
        this.upgradeViews.splice(0, this.upgradeViews.length);

        let upgrades = model.getUpgrades().filter(upgrade => upgrade.getIsUnlocked());
        for(let i = 0; i < this.upgradesPerPage && ((i + model.getUpgradePage() * this.upgradesPerPage) < upgrades.length); i++){
            let upgradeView = upgrades[i + model.getUpgradePage() * this.upgradesPerPage].getView();
            upgradeView.setPosition(1075, 150 + 110 * i);
            this.add(upgradeView);
            this.upgradeViews.push(upgradeView);
            upgradeView.setCanPurchase(PlayerData.getPlayer().getMoney() >= upgrades[i + model.getUpgradePage() * this.upgradesPerPage].getCost());
        }

        let upgradeNextRect = children[11] as Phaser.GameObjects.Rectangle;
        if(upgrades.length < this.upgradesPerPage || (model.getUpgradePage() + 1) * this.upgradesPerPage >= upgrades.length){
            upgradeNextRect.disableInteractive();
            upgradeNextRect.setFillStyle(this.buttonColorDark);
        }else{
            upgradeNextRect.setInteractive();
            upgradeNextRect.setFillStyle(this.buttonColor);
        }

        let upgradePrevRect = children[13] as Phaser.GameObjects.Rectangle;
        if(upgrades.length < this.upgradesPerPage || model.getUpgradePage() == 0){
            upgradePrevRect.disableInteractive();
            upgradePrevRect.setFillStyle(this.buttonColorDark);
        }else{
            upgradePrevRect.setInteractive();
            upgradePrevRect.setFillStyle(this.buttonColor);
        }
    }
}