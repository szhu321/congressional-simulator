import WorkerController from "../controller/WorkerController";
import Worker from "../model/Worker";

export default class WorkerView extends Phaser.GameObjects.Container{
    
    private workerController: WorkerController;

    constructor(scene: Phaser.Scene)
    {
        super(scene);
    
    }

    public setWorkerController(value: WorkerController) {this.workerController = value;}
    public getWorkerController(): WorkerController {return this.workerController;}

    /**
     * Update card display based on model information
     * @param {Worker} model 
     */
    updateViewCallback(model: Worker){

    }
}