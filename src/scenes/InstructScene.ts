import {SCENE_CONFIG} from "../gameconfig";

export default class InstructScene extends Phaser.Scene
{
    private background: Phaser.GameObjects.Rectangle;

    create()
    {
        this.initializeBackground();
        this.initializeCamera();


        let text = `
        FUNDRAISING GAME: PLAYABLE. \n
        To start head to the Fundraising game to collect money. \n
        To get money click on the text/call button. Next, obtain upgrades so that you can get more money. \n
        \n\n
        CAMPAIGN GAME: WORK IN PROGRESS. \n
        Next, head to the campaign scene to send workers to campaign. Your goal is to have more voters on your side when the general elections starts.\n
        To send a worker, click on a tile on the map to select it, then press on a worker on the bottom panel to send them.
        Note that you would need enough money to send the worker.
        \n\n
        DEBATE GAME: KINDOF PLAYABLE. \n
        When you want to capture a tile in the campaign game that's been dominated by your opponent, you will have to play a debate game. \n
        Each round you may draw cards from your deck. You can drag the card on your deck onto the board if you have the money.
        Cards that are placed in the first round cannot be played until the next round. \n
        To attack your opponent, drag a card from your board onto your opponent's vote count.
        To attack your opponent's card drag a card from your board onto your opponent's card.\n
        The game ends when one side obtains all the votes.
        `
        let fontSize = 22;
        let textBoxWidth = SCENE_CONFIG.scene_width * (3/4);

        let textView = this.add.text(SCENE_CONFIG.scene_width / 2, 10, text);
        textView.setFontSize(fontSize);
        textView.setOrigin(0.5, 0);
        textView.setWordWrapWidth(textBoxWidth, true).setAlign('center');

        
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
}