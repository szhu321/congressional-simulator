import PlayerData from "../../data/PlayerData";
import PlatformModel from "../models/PlatformModel";

export default class PlatformController{
    private model: PlatformModel;

    constructor(){
        this.model = null;
    }

    setModel(model: PlatformModel){
        this.model = model;
    }

    selectAnswer(questionIndex: number, answerIndex: number){
        this.model.chooseNewQuestion(questionIndex, answerIndex);
    }

    passTime(delta: number){
        this.model.checkDay(PlayerData.getGameData().getCurrentDay());
    }
}