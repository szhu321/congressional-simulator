import Worker from "../model/Worker";

export default class WorkerView extends Phaser.GameObjects.Container{
    
    
    constructor(scene: Phaser.Scene)
    {
        super(scene);
    
    }

    /**
     * Update card display based on model information
     * @param {Worker} model 
     */
    updateViewCallback(model: Worker){

    }
}