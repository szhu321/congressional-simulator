import Button from "./Button";
import Popup from "./Popup";
import TextContent from "./TextContent";

/**
 * A popup button is connected to a Popup window. When the button is clicked
 * the popup window will appear. It can also be used to set the content of the 
 * popup window.
 */
export default class PopupButton extends Button
{
    private content: TextContent;
    private popup: Popup;

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        this.content = new TextContent(scene);
        this.getText().setText("Info");
        this.setBackgroundColor(0xd19d3d);
        this.setOnclickCallback(() => {
            if(this.popup)
            {
                this.popup.setContent(this.content);
                this.popup.showPopup();
            }
            else
            {
                console.log("[Error] Popup button has no popup. Please call setPopup on the popup button.");
            }
        })
    }

    public setPopup(value: Popup)
    {
        this.popup = value;
    }

    public setContent(value: TextContent)
    {
        this.content = value;
    }

    public setContentText(value: string)
    {
        this.content.setText(value);
    }
}