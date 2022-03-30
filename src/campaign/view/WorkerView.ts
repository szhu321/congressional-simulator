import Worker from "../model/Worker";

export default class WorkerView extends Phaser.GameObjects.Container{
    constructor(scene: Phaser.Scene) {
        super(scene);
        // // this.maxLines = 7;
        // // this.vgap = 10;
        // this.fontSize = 15;
        // this.abilityFontSize = 12;
        // this.maxHeight = 140;
        // this.maxWidth = 118;
        // this.textAmount = 6;
        // this.cardColor = 0x9f93e9;
        // this.cardColorDark = 0xaba187;

        // this.nameText;
        // this.workerIcon;
        // this.useButton;
    }

    initialize(){
        // //worker card's background
        // let rect = this.scene.add.rectangle(0, 0, 0, 0, this.cardColor);
        // this.add(rect);
        // this.background = rect;

        // //worker name
        // this.nameText = this.scene.add.text(this.width /2, 10, "Worker");
        // this.nameText.setOrigin(0.5, 0.5);
        // this.nameText.setAlign("center");
        // this.nameText.setFontSize(this.fontSize);

        // //worker icon
        // this.workerIcon = this.scene.add.rectangle(0, 0, 0, 0, 0xeeeeee);
        // this.add(this.workerIcon);

        // //worker btn
        // this.useButton = this.scene.add.rectangle(this.width/2, this.height - 10, 30, 10, 0xaaaaaa);
        // this.useButton.setInteractive();
        // this.useButtonText = this.scene.add.text(this.useButton.x, this.useButton.y, "Campaign");
        // this.useButtonText.setAlign("center");
        // this.useButtonText.setOrigin(0.5, 0.5);

        // for(let i = 0; i < this.textAmount; i++){
        //     let text = this.scene.add.text(0, 0, "", {});
        //     text.setFontSize(this.fontSize);
        //     text.setColor("black")
        //     this.add(text);
        // }
        //this.setDataEnabled();
        //this.setData({dropZoneName : "", dropZoneX: 0, dropZoneY: 0, cost: 100});
    }

    // updateDisplay(textArray, frontFacing){
    //     let children = this.getAll();
    //     // let combinedText = textArray.join("\r\n");

    //     children[0].setSize(this.maxWidth, this.maxHeight);
    //     children[0].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

    //     if(frontFacing){
    //         for(let i = 0; i < this.textAmount; i++){
    //             children[i + 1].setText(textArray[i]);
    //         }
    //         // Card Level
    //         children[1].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

    //         // Card Cost
    //         children[2].setPosition(this.maxWidth / 2, -1 * this.maxHeight / 2);
    //         children[2].setOrigin(1, 0);

    //         // Card Name
    //         children[3].setOrigin(0.5, 0);
    //         children[3].setWordWrapWidth(this.maxWidth, true).setAlign('center');
    //         children[3].setPosition(0, children[1].height - this.maxHeight / 2);
    //         children[3].setFontStyle('bold');

    //         // Card Ability
    //         children[4].setOrigin(0.5, 0);
    //         children[4].setWordWrapWidth(this.maxWidth, true).setAlign('center');
    //         children[4].setPosition(0, children[3].height + children[1].height - this.maxHeight / 2);
    //         children[4].setFontSize(this.abilityFontSize);

    //         // Card Health
    //         children[5].setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
    //         children[5].setOrigin(0, 1);

    //         // Card Attack
    //         children[6].setPosition(this.maxWidth / 2, this.maxHeight / 2);
    //         children[6].setOrigin(1, 1);
    //     }else{
    //         children[1].setText("Congrssional Simulator");
    //         children[1].setOrigin(0.5, 0.5);
    //         children[1].setWordWrapWidth(this.maxWidth, true).setAlign('center');
    //         children[1].setFontStyle('bold');

    //         children[2].setText(textArray[0]);
    //         children[2].setPosition(0, this.maxHeight / 2);
    //         children[2].setOrigin(0.5, 1);
    //     }
    // }

    /**
     * Update card display based on model information
     * @param {Worker} model 
     */
    updateViewCallback(model: Worker){
        // let children = this.getAll();
        // let level = model.getStar();
        // let levelStr = "";
        // for(let i = 0; i < level; i++){
        //     levelStr += "\u{2605}";
        // }
        // children[1].setText(levelStr);
        // //children[2].setText(model.getCost());
        // children[3].setText(model.getPoliticalIssue() + " " + model.getPoliticalView());
        // children[4].setText(model.getAbility());
        // //children[5].setText(model.getHealth());
        // //children[6].setText(model.getAttack());
        // if(model.actionCount > 0)
        //     this.background.setFillStyle(this.cardColor);
        // else
        //     this.background.setFillStyle(this.cardColorDark);
    }
}