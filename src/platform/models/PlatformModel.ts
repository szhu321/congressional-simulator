import PlatformView from "../views/PlatformView";
import QuestionModel from "./QuestionModel";

export default class PlatformModel{
    private view: PlatformView;
    private questions: QuestionModel[];

    constructor(){
        this.view = null;
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

    chooseNewQuestion(){
        this.view.setNewQuestion(this);
    }
}