import PlatformModel from "../models/PlatformModel";

export default class PlatformController{
    private model: PlatformModel;

    constructor(){
        this.model = null;
    }

    setModel(model: PlatformModel){
        this.model = model;
    }
}