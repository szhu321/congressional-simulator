import { CANDIDATE } from "../campaign/campaignenum";
import PlayerData from "../data/PlayerData";
import EventDispatcher from "../events/EventDispatcher";
import {SCENE_CONFIG} from "../gameconfig";
import { GAME_EVENTS } from "../gameenums";

export default class GameOverScene extends Phaser.Scene
{
    create()
    {
        this.initializeBackground();
        this.initializeCamera();

        EventDispatcher.getInstance().emit(GAME_EVENTS.UPDATE_GLOBAL_CAMPAIGN_DATA);
        let yourVotes = this.getPlayerNumberOfVotes();
        let opponentVotes = this.getOpponentNumberOfVotes();

        // yourVotes = 0;
        // opponentVotes = 0;

        let winText = "There is a tie. No one was elected. There will be a new election.";
        if(yourVotes > opponentVotes)
            winText = "Congratulation! You won the election!!!";
        if(yourVotes < opponentVotes)
            winText = "You lost the election. Try again in 2 years";


        let text = `
        GAME OVER\n\n\n
        ${winText}\n\n
        End Statistics:\n\n
        Your Votes: ${yourVotes}\n
        Opponent Votes: ${opponentVotes}\n

        `
        let fontSize = 36;
        let textBoxWidth = SCENE_CONFIG.scene_width * (3/4);

        let textView = this.add.text(SCENE_CONFIG.scene_width / 2, 10, text);
        textView.setFontSize(fontSize);
        textView.setOrigin(0.5, 0);
        textView.setWordWrapWidth(textBoxWidth, true).setAlign('center');
    }

    private getPlayerNumberOfVotes(): number
    {
        let mapModel = PlayerData.getCampaignData().getMapModel();
        let rowNumber = mapModel.getRows();
        let colNumber = mapModel.getCols();
        let result = 0;
        for(let row = 0; row < rowNumber; row++)
        {
            for(let col = 0; col < colNumber; col++)
            {
                let tile = mapModel.getTileAt(row, col);
                if(tile)
                {
                    let info = tile.getCandidateInfoFor(CANDIDATE.PLAYER);
                    if(info)
                        result += info.getAmountOccupied();
                }
            }
        }
        return result;
    }

    private getOpponentNumberOfVotes(): number
    {
        let mapModel = PlayerData.getCampaignData().getMapModel();
        let rowNumber = mapModel.getRows();
        let colNumber = mapModel.getCols();
        let result = 0;
        for(let row = 0; row < rowNumber; row++)
        {
            for(let col = 0; col < colNumber; col++)
            {
                let tile = mapModel.getTileAt(row, col);
                if(tile)
                {
                    let info = tile.getCandidateInfoFor(CANDIDATE.OPPONENT);
                    result += info.getAmountOccupied();
                }
            }
        }
        return result;
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