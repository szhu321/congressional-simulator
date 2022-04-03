import { WORKER_TYPE } from "../campaignenum";
import WorkerController from "../controller/WorkerController";
import Worker from "../model/Worker"
import WorkerView from "../view/WorkerView";

export default class WorkerFactory
{
    public static getWorker(scene: Phaser.Scene, type: WORKER_TYPE): Worker
    {
        let worker = this.createWorker(type);
        let workerController = new WorkerController();
        let workerView = new WorkerView(scene);
        worker.setView(workerView);
        workerView.setWorkerController(workerController);
        workerController.setWorker(worker);
        scene.add.existing(workerView);
        return worker;
    }

    private static createWorker(type: WORKER_TYPE): Worker
    {
        let worker = new Worker();
        switch(type)
        {
            case WORKER_TYPE.COLD_CALLER: {
                worker.setName("Cold Caller");
                worker.setWorkerType(WORKER_TYPE.COLD_CALLER);
                worker.setDailySalary(30);
                worker.setPersuasivePower(1);
                worker.setInfluencePower(0);
            } break;
            case WORKER_TYPE.LEAFLETER: {
                worker.setName("LEAFLETER");
                worker.setWorkerType(WORKER_TYPE.COLD_CALLER);
                worker.setDailySalary(300);
                worker.setPersuasivePower(2);
                worker.setInfluencePower(1);
            } break;
        }

        return worker;
    }
}
