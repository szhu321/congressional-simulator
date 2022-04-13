import "phaser";
import UpgradeModel from "../models/UpgradeModel";
import WorkerModel from "../models/WorkerModel";

export default abstract class FundraiseButton extends Phaser.GameObjects.Container{
    protected fontSize: number;
    protected maxHeight: number;
    protected maxWidth: number;
    protected textAmount: number;
    protected buttonColor: number;
    protected buttonColorDark: number;
    protected background: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.fontSize = 18;
        this.maxHeight = 100;
        this.maxWidth = 300;
        this.buttonColor = 0xf7e9c3;
        this.buttonColorDark = 0xaba187;
    }

    getMaxHeight(){
        return this.maxHeight;
    }

    getMaxWidth(){
        return this.maxWidth;
    }

    setTextAmount(amount: number){
        this.textAmount = amount;
    }

    initialize(){
        let rect = this.scene.add.rectangle(0, 0, 0, 0, this.buttonColor);
        this.add(rect);
        this.background = rect;
        for(let i = 0; i < this.textAmount; i++){
            let text = this.scene.add.text(0, 0, "", {});
            text.setFontSize(this.fontSize);
            text.setColor("black")
            this.add(text);
        }
    }

    abstract updateDisplay(): void;

    abstract updateViewCallback(model: UpgradeModel | WorkerModel): void;

    setCanPurchase(canPurchase: boolean){
        if(canPurchase){
            this.setInteractive();
            this.background.setFillStyle(this.buttonColor);
        }else{
            this.disableInteractive();
            this.background.setFillStyle(this.buttonColorDark);
        }
    }
}