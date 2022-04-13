import PositionTakingView from "../views/PositionTakingView";
import QuestionModel from "./QuestionModel";

export default class PositionTakingModel{
    private view: PositionTakingView;
    private questions: QuestionModel[];

    constructor(){
        this.view = null;
    }

    setView(view: PositionTakingView){
        this.view = view;
        this.questions = [];
    }

    addQuestion(question: QuestionModel){
        this.questions.push(question);
    }

    getQuestions(){
        return this.questions;
    }

    chooseNewQuestion(){
        this.view.setNewQuestion(this);
    }
}