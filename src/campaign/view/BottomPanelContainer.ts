import Phaser from 'phaser';
import PlayerData from '../../data/PlayerData';
import Button from '../../phaserobjs/Button';

export default class BottomPanelContainer extends Phaser.GameObjects.Container
{
    /**
     * @type {Button[]}
     */
    items;

    constructor(scene)
    {
        super(scene);
        this.width = 1050;
        this.height = 220;
        this.backgroundColor = 0x4d4d4d;
        this.backgroundBorderWidth = 3;
        this.backgroundBorderColor = 0xffffff;
        this.items = [];
    }

    initialize()
    {
        console.log("Initializing bottom container..");
        //background rectangle.
        let background = this.scene.add.rectangle(0,0, this.width, this.height, this.backgroundColor);
        background.setOrigin(1, 1);
        background.setStrokeStyle(this.backgroundBorderWidth, this.backgroundBorderColor);
        this.add(background);

        //add worker buttons.
        this.initializeWorkerButtons();
        
    }

    initializeWorkerButtons()
    {
        let button = new Button(this.scene, -this.width + 150, -this.height/2, 200, 100);
        button.text.setText("Cold Caller\n $30 \n\n Send");
        button.setOnclickCallback(() => {
            console.log("Bottom panel button 1 clicked.");
            this.scene.addWorkerAtSelectedTile();
            PlayerData.getPlayer().moneySpent += 30;
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);

        button = new Button(this.scene, -this.width + 400, -this.height/2, 200, 100);
        button.text.setText("leafleter\n $100 \n\n Send");
        button.setOnclickCallback(() => {
            console.log("Bottom panel button 2 clicked.");
            this.scene.addWorkerAtSelectedTile();
            PlayerData.getPlayer().moneySpent += 100;
        });
        //button.setDepth(1);
        this.items.push(button);
        this.scene.add.existing(button);
        this.add(button);
    }

    displayItems()
    {
        for(let item of this.items)
            item.setVisible(true);
    }

    hideItems()
    {
        for(let item of this.items)
            item.setVisible(false);
    }
}