import { SCENE_CONFIG } from "../gameconfig";
import Content from "./Content";


export default class Popup extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Rectangle;
    private content: Content;

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
            this.hidePopup();
        });
        //prevent the clicking of the background affect anything under it.
        this.preventEventPropogataion(this.background);
        this.add(this.background);
        this.content = null;

        this.scene.add.existing(this);
        //hide the popup at the beginning.
        this.hidePopup();
    }

    public getContent(): Content{return this.content;}
    public setContent(value: Content)
    {
        if(this.content)
        {
            this.remove(this.content);
            this.scene.children.remove(this.content);
        }
        this.content = value;
        //prvent the click from the content affect anything under it.
        this.preventEventPropogataion(this.content);
        this.scene.add.existing(this.content);
        this.add(this.content);
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