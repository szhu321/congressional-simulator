import ClickerModel from "./ClickerModel.js";
import ClickerController from "./ClickerController.js";
import ClickerView from "./ClickerView.js";

class ClickerGame{
    constructor(initModel, initView, initController){
        this.model = initModel;
        this.view = initView;
        this.controller = initController;

        this.model.setView(this.view);

        this.view.setController(this.controller);

        this.controller.setModel(this.model);
    }

    launch(){
        this.model.setWorkers(null);
        this.view.setGUIIds();
        this.controller.registerClickerEventHandlers();
    }
}

let model = new ClickerModel();
let view = new ClickerView();
let controller = new ClickerController();

let clickerGame = new ClickerGame(model, view, controller);
clickerGame.launch();