import { SCENE_CONFIG } from "../../gameconfig";
import PlatformController from "../controllers/PlatformController";
import AnswerModel from "../models/AnswerModel";
import PlatformModel from "../models/PlatformModel";
import QuestionModel from "../models/QuestionModel";
import PlatformView from "../views/PlatformView";


export default class PlatformScene extends Phaser.Scene {
    private model: PlatformModel;
    private view: PlatformView;
    private controller: PlatformController;

    create()
    {
        this.initializeBackground();
        this.initializeCamera();

        //start creating the scene under here.
        this.model = new PlatformModel();
        this.view = new PlatformView(this);
        this.controller = new PlatformController();

        this.model.setView(this.view);
        this.view.setController(this.controller);
        this.controller.setModel(this.model);

        this.createQuestionsAndAnswers(this.model);
        this.view.initialize(this.model);

        this.add.existing(this.view);
    }


    
    initializeCamera()
    {
        let x = SCENE_CONFIG.scene_camera_viewport_x;
        let y = SCENE_CONFIG.scene_camera_viewport_y;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        this.cameras.main.setViewport(x, y, width, height);
    }

    initializeBackground()
    {
        let x = 0;
        let y = 0;
        let width = SCENE_CONFIG.scene_width;
        let height = SCENE_CONFIG.scene_height;
        let backgroundColor = SCENE_CONFIG.scene_background_color;
        let background = this.add.rectangle(x, y, width, height, backgroundColor);
        background.setOrigin(0, 0);
    }

    createQuestionsAndAnswers(model: PlatformModel){
        // let question1 = new QuestionModel("A high paying donor asked you how you would manage healthcare if you were to become elected?");
        let questions = ["A high paying donor asked you how you would manage healthcare if you were to become elected?",
                        "Should the government raise the federal minimum wage?",
                        "Should the federal government pay for tuition at four-year colleges and universities?",
                        "Should the U.S. expand offshore oil drilling?",
                        "Should the U.S. raise taxes on the rich?",
                        "Should the U.S. raise or lower the tax rate for corporations?",
                        "Should the government increase environmental regulations to prevent climate change?",
                        "Do you support the legalization of marijuana?"];
        let answers = [[
            "Support the Affordable Care Act",
            "Denounce the Affordable Care Act",
            "Do nothing"
        ], [
            "Yes",
            "No",
            "Yes, and adjust it every year according to inflation",
            "Yes, and make it a living wage",
            "No, most minimum wage jobs are meant to develop experience, not support a family",
            "No, this will only cause prices to increase in a never ending cycle"
        ], [
            "Yes",
            "No",
            "Yes, but only for partial tuition",
            "No, but provide lower interest rates for student loans",
            "No, but provide more scholarship opportunities for low-income students",
        ], [
            "Yes",
            "No",
            "Yes, and deregulate the energy sector to let the free market determine the best energy solutions",
            "No, and provide more incentives for alternative energy production",
            "No, but maintain our current offshore oil wells",
            "No, and nationalize the energy sector",
            "No, end all offshore oil drilling"
        ], [
            "Yes",
            "No",
            "Lower the income tax rate and remove all existing tax loopholes for large corporations",
            "Yes, and raise taxes on all income brackets",
            "No, but lower taxes for the poor",
            "Reform to a flat tax",
            "No, keep the current tax structure"
        ], [
            "Raise",
            "Lower",
            "Maintain the current rate",
            "Keep current rates but eliminate deductions and loopholes",
            "Lower, but eliminate deductions and loopholes",
            "Increase for large multinational corporations but lower for small businesses",
            "Remove taxes on corporations and tax shareholder dividends instead"
        ], [
            "Yes",
            "No",
            "Yes, and provide more incentives for alternative energy production",
            "No, provide more incentives for alternative energy production instead",
            "No, and global warming is a natural occurrence",
            "No, tax carbon emissions instead"
        ], [
            "Yes",
            "No",
            "Yes, and legalize, tax, and regulate marijuana instead of criminalizing it",
            "No, and increase penalties for non-violent drug offenders",
            "Yes, but only for medical use",
            "Yes, and immediately release anyone serving time solely for drug offenses"
        ]]

        for(let i = 0; i < questions.length; i++){
            let question = new QuestionModel(questions[i]);
            for(let j = 0; j < answers[i].length; j++){
                let answer = new AnswerModel(answers[i][j]);
                question.addAnswer(answer);
            }
            model.addQuestion(question);
        }
    }

}