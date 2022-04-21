import PlayerData from "../../data/PlayerData";
import EventDispatcher from "../../events/EventDispatcher";
import { GAME_EVENTS, POLITICAL_PARTY } from "../../gameenums";
import PlatformView from "../views/PlatformView";
import QuestionModel from "./QuestionModel";

export default class PlatformModel{
    private view: PlatformView;
    private questions: QuestionModel[];
    private currentQuestion: number;
    private showNextQuestion: boolean;
    private dayCheckpoint: number;

    constructor(){
        this.view = null;
        this.currentQuestion = 0;
        this.showNextQuestion = false;
        this.dayCheckpoint = 0;
    }

    setView(view: PlatformView){
        this.view = view;
        this.questions = [];
    }

    addQuestion(question: QuestionModel){
        this.questions.push(question);
    }

    getQuestions(){
        return this.questions;
    }

    getCurrentQuestion(){
        return this.currentQuestion;
    }

    getShowNextQuestion(){
        return this.showNextQuestion;
    }

    chooseNewQuestion(questionIndex: number, answerIndex: number){
        let politicalEffect = 0;
        switch(questionIndex){
            case 0:
                PlayerData.getPlayer().setPoliticalParty(this.questions[questionIndex].getAnswers()[answerIndex].getText() as POLITICAL_PARTY);
                break;
            case 1:
                PlayerData.getPlayer().setDistrict(answerIndex + 1);
                break;
            default:
                let effect = this.questions[questionIndex].getAnswers()[answerIndex].getEffect();
                let politicalParty = PlayerData.getPlayer().getPoliticalParty();
                if(politicalParty == POLITICAL_PARTY.DEMOCRATIC_PARTY){
                    PlayerData.getPlayer().setPartyPopularity(PlayerData.getPlayer().getPartyPopularity() + effect);
                    politicalEffect = effect;
                }else{
                    PlayerData.getPlayer().setPartyPopularity(PlayerData.getPlayer().getPartyPopularity() - effect);
                    politicalEffect = -effect;
                }
        }
        // this.currentQuestion++;
        if(++this.currentQuestion == 2){
            EventDispatcher.getInstance().emit(GAME_EVENTS.START_GAME);
        }
        this.showNextQuestion = false;
        this.view.setNewQuestion(this, politicalEffect);
    }

    checkDay(currentDay: number){
        if(currentDay >= this.dayCheckpoint + 30  && !this.showNextQuestion){
            this.dayCheckpoint += 30;
            this.showNextQuestion = true;
            if(this.currentQuestion < this.questions.length){
                this.view.setNewQuestion(this, 0);
            }
        }
    }
}