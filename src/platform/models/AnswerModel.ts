export default class AnswerModel{
    private text: string;
    private effect: number;

    constructor(answer: {text: string, effect: number}){
        this.text = answer.text;
        this.effect = answer.effect;
    }

    getText(){
        return this.text;
    }

    getEffect(){
        return this.effect;
    }
}