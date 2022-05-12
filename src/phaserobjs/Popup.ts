import { SCENE_CONFIG } from "../gameconfig";
import Button from "./Button";
import Content from "./Content";


export default class Popup extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Rectangle;
    private content: Content;
    private hidePopupButton: Button;

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        //the background is going to be transparent and the size of the viewable area.
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;

        this.setPosition(width / 2, height / 2);

        this.background = scene.add.rectangle(0, 0, width, height, 0x000000, 0.5);
        this.background.setInteractive();
        //when the background is clicked the popup is closed.
        this.background.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            //this.hidePopup();
            //do nothing when the background is clicked.
        });
        //clicking the background will prevent the event from going to anything under it.
        this.preventEventPropogataion(this.background);
        this.add(this.background);
        this.content = null;

        this.scene.add.existing(this);
        //hide the popup at the beginning.
        this.hidePopup();

        //create a hide popup button.
        this.hidePopupButton = new Button(scene, 0, 0, 50, 50, 0xff0000);
        this.hidePopupButton.getText().setText("X");
        this.hidePopupButton.setOnclickCallback(() => {
            this.hidePopup();
        });
        //this.scene.add.existing(this.hidePopupButton);
        //this.add(this.hidePopupButton);
    }

    public getContent(): Content{return this.content;}
    public setContent(value: Content)
    {
        if(this.content)
        {
            this.remove(this.content);
            this.scene.children.remove(this.content);
            this.content.remove(this.hidePopupButton);
        }
        this.content = value;
        //prvent the click from the content affect anything under it.
        this.preventEventPropogataion(this.content);
        this.scene.add.existing(this.content);
        this.add(this.content);
        //add the button to the content.
        this.content.add(this.hidePopupButton);
        this.hidePopupButton.setPosition(this.content.getBackground().width / 2, -this.content.getBackground().height / 2);
    }

    public showPopup()
    {
        this.setVisible(true);
    }

    public hidePopup()
    {
        this.setVisible(false);
    }

    //prevent the event from proprogataion further down the event chain.
    private preventEventPropogataion(obj: Phaser.GameObjects.GameObject)
    {
        obj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
        obj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_MOVE, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
        obj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
        obj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
            event.stopPropagation();
        })
    }
}