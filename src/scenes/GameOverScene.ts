import { CANDIDATE } from "../campaign/campaignenum";
import PlayerData from "../data/PlayerData";
import EventDispatcher from "../events/EventDispatcher";
import {SCENE_CONFIG} from "../gameconfig";
import { GAME_EVENTS, POLITICAL_PARTY } from "../gameenums";

export default class GameOverScene extends Phaser.Scene
{
    preload()
    {
        this.load.audio('win', 'assets/win_sound.wav');
        this.load.audio('lose', 'assets/lose_sound.mp3');
    }

    create()
    {
        this.initializeBackground();
        this.initializeCamera();

        this.sound.add('win');
        this.sound.add('lose');

        EventDispatcher.getInstance().emit(GAME_EVENTS.UPDATE_GLOBAL_CAMPAIGN_DATA);
        let yourVotes = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.PLAYER);
        let opponentVotes = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.OPPONENT);
        let democraticPartisans = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.DEMOCRATIC_PARTISAN);
        let republicanPartisans = PlayerData.getCampaignData().getMapModel().getTotalVotesFor(CANDIDATE.REPUBLICAN_PARTISAN);
        let partisanVotes = 0;

        if(PlayerData.getPlayer().getPoliticalParty() === POLITICAL_PARTY.DEMOCRATIC_PARTY)
        {
            yourVotes += democraticPartisans;
            opponentVotes += republicanPartisans;
            partisanVotes = democraticPartisans;
        }
        else
        {
            yourVotes += republicanPartisans;
            opponentVotes += democraticPartisans;
            partisanVotes = republicanPartisans;
        }
        // yourVotes = 0;
        // opponentVotes = 0;

        let winText = "There is a tie. No one was elected. There will be a new election.";
        if(yourVotes > opponentVotes){
            winText = "Congratulation! You won the election!!!";
            this.sound.play('win');
        }
        if(yourVotes < opponentVotes){
            winText = "You lost the election. Try again in 2 years";
            this.sound.play('lose');
        }


        let text = `
        GAME OVER\n\n\n
        ${winText}\n\n
        End Statistics:\n\n
        Your Total Votes: ${yourVotes}\n
        Opponent Total Votes: ${opponentVotes}\n
        Votes from partisans: ${partisanVotes}\n
        Votes from campaign: ${yourVotes - partisanVotes}\n\n

        To restart refresh the website.
        `
        let fontSize = 28;
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