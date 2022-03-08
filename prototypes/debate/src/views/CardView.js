export default class CardView extends Phaser.GameObjects.Container{
    constructor(scene){
        super(scene);
        // this.maxLines = 7;
        // this.vgap = 10;
        this.fontSize = 15;
        this.abilityFontSize = 12;
        this.maxHeight = 140;
        this.maxWidth = 118;
        this.textAmount = 6;
        this.cardColor = 0xf7e9c3;
    }

    initialize(){
        let rect = this.scene.add.rectangle(0, 0, 0, 0, this.cardColor);
        this.add(rect);
        for(let i = 0; i < this.textAmount; i++){
            let text = this.scene.add.text(0, 0, "", {});
            text.setFontSize(this.fontSize);
            text.setColor("black")
            this.add(text);
        }
        this.setDataEnabled();
        this.setData({dropZoneName : "", dropZoneX: 0, dropZoneY: 0, cost: 100});
    }

    updateDisplay(textArray, frontFacing){
        let children = this.getAll();
        // let combinedText = textArray.join("\r\n");

        children[0].setSize(this.maxWidth, this.maxHeight);
        children[0].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);

        if(frontFacing){
            for(let i = 0; i < this.textAmount; i++){
                children[i + 1].setText(textArray[i]);
            }
    
            children[1].setPosition(-1 * this.maxWidth / 2, -1 * this.maxHeight / 2);
    
            children[2].setPosition(this.maxWidth / 2, -1 * this.maxHeight / 2);
            children[2].setOrigin(1, 0);
    
            children[3].setOrigin(0.5, 0);
            children[3].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[3].setPosition(0, children[1].height - this.maxHeight / 2);
            children[3].setFontStyle('bold');
    
            children[4].setOrigin(0.5, 0);
            children[4].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[4].setPosition(0, children[3].height + children[1].height - this.maxHeight / 2);
            children[4].setFontSize(this.abilityFontSize);
    
            children[5].setPosition(-1 * this.maxWidth / 2, this.maxHeight / 2);
            children[5].setOrigin(0, 1);
    
            children[6].setPosition(this.maxWidth / 2, this.maxHeight / 2);
            children[6].setOrigin(1, 1);
        }else{
            children[1].setText("Congrssional Simulator");
            children[1].setOrigin(0.5, 0.5);
            children[1].setWordWrapWidth(this.maxWidth, true).setAlign('center');
            children[1].setFontStyle('bold');

            children[2].setText(textArray[0]);
            children[2].setPosition(0, this.maxHeight / 2);
            children[2].setOrigin(0.5, 1);
        }
    }
}