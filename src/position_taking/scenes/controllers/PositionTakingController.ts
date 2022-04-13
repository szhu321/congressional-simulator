import PositionTakingModel from "../models/PositionTakingModel";

export default class PositionTakingController{
    private model: PositionTakingModel;

    constructor(){
        this.model = null;
    }

    setModel(model: PositionTakingModel){
        this.model = model;
    }
}