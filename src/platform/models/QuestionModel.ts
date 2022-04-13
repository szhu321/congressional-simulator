import AnswerModel from "./AnswerModel";

export default class QuestionModel{
    private text: string;
    private answers: AnswerModel[];

    constructor(text: string){
        this.text = text;
        this.answers = [];
    }

    getText(){
        return this.text;
    }

    addAnswer(answer: AnswerModel){
        this.answers.push(answer);
    }

    getAnswers(){
        return this.answers;
    }
}