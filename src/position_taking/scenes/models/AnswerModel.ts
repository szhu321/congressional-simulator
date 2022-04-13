export default class AnswerModel{
    private text: string;

    constructor(text: string){
        this.text = text;
    }

    getText(){
        return this.text;
    }
}