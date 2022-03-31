import Worker from "../model/Worker"
import WorkerView from "../view/WorkerView";

export default class WorkerFactory
{
    public static getWorker(scene: Phaser.Scene): Worker
    {
        let worker = new Worker();
        let workerView = new WorkerView(scene);
        worker.setView(workerView);

        scene.add.existing(workerView);
        return worker;
    }
}
