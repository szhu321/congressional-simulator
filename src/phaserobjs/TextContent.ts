import Content from "./Content";
import MyText from "./MyText";

/**
 * A text content is a content object that has text built into it.
 */
 export default class TextContent extends Content
 {
    private text: MyText;

    constructor(scene: Phaser.Scene, x:number = 0, y:number = 0, width:number = 1000, height:number = 500)
    {
        super(scene, x, y, width, height);
        this.text = new MyText(scene, 0, 0, "");
        this.text.setColor("#ffffff");
        //this.scene.add.existing(this.text);
        this.add(this.text);
    }

    public getText(): MyText {return this.text;}
    public setText(value: string) {
        this.text.setText(value);
    }
 }
 