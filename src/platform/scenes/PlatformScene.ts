import { SCENE_CONFIG } from "../../gameconfig";
import PlatformController from "../controllers/PlatformController";
import AnswerModel from "../models/AnswerModel";
import PlatformModel from "../models/PlatformModel";
import QuestionModel from "../models/QuestionModel";
import PlatformView from "../views/PlatformView";
import { POLITICAL_PARTY } from "../../gameenums";


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

    update(time: number, delta: number){
        this.controller.passTime(delta);
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
        let questions = ["Which political party do you belong to?",
            "Which district in New York are you running for House Representative in?",
            "A high paying donor asked you how you would manage healthcare if you were to become elected?",
            "Should the government raise the federal minimum wage?",
            "Should the federal government pay for tuition at four-year colleges and universities?",
            "Should the U.S. expand offshore oil drilling?",
            "Should the U.S. raise taxes on the rich?",
            "Should the U.S. raise or lower the tax rate for corporations?",
            "Should the government increase environmental regulations to prevent climate change?",
            "Do you support the legalization of marijuana?"];
        let answers = [[
            {
                text: POLITICAL_PARTY.DEMOCRATIC_PARTY,
                effect: 0
            },
            {
                text: POLITICAL_PARTY.REPUBLICAN_PARTY,
                effect: 0
            }
        ], [
            {
                text: "District 1",
                effect: 0
            },
            {
                text: "District 2",
                effect: 0
            },
            {
                text: "District 3",
                effect: 0
            },
            {
                text: "District 4",
                effect: 0
            },
            {
                text: "District 5",
                effect: 0
            },
            {
                text: "District 6",
                effect: 0
            },
        ], [
            {
                text: "Support the Affordable Care Act",
                effect: 1
            },
            {
                text: "Denounce the Affordable Care Act",
                effect: -1
            },
            {
                text: "Do nothing",
                effect: 0
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Yes, and adjust it every year according to inflation",
                effect: 1
            },
            {
                text: "Yes, and make it a living wage",
                effect: 1
            },
            {
                text: "No, most minimum wage jobs are meant to develop experience, not support a family",
                effect: -1
            },
            {
                text: "No, this will only cause prices to increase in a never ending cycle",
                effect: -1
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Yes, but only for partial tuition",
                effect: 1
            },
            {
                text: "No, but provide lower interest rates for student loans",
                effect: 1
            },
            {
                text: "No, but provide more scholarship opportunities for low-income students",
                effect: 1
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Yes, and deregulate the energy sector to let the free market determine the best energy solutions",
                effect: -1
            },
            {
                text: "No, and provide more incentives for alternative energy production",
                effect: 1
            },
            {
                text: "No, but maintain our current offshore oil wells",
                effect: -1
            },
            {
                text: "No, and nationalize the energy sector",
                effect: 1
            },
            {
                text: "No, end all offshore oil drilling",
                effect: 1
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Lower the income tax rate and remove all existing tax loopholes for large corporations",
                effect: 1
            },
            {
                text: "Yes, and raise taxes on all income brackets",
                effect: 1
            },
            {
                text: "No, but lower taxes for the poor",
                effect: 1
            },
            {
                text: "Reform to a flat tax",
                effect: -1
            },
            {
                text: "No, keep the current tax structure",
                effect: -1
            },
        ], [
            {
                text: "Raise",
                effect: 1
            },
            {
                text: "Lower",
                effect: -1
            },
            {
                text: "Maintain the current rate",
                effect: -1
            },
            {
                text: "Keep current rates but eliminate deductions and loopholes",
                effect: 1
            },
            {
                text: "Lower, but eliminate deductions and loopholes",
                effect: 1
            },
            {
                text: "Increase for large multinational corporations but lower for small businesses",
                effect: 1
            },
            {
                text: "Remove taxes on corporations and tax shareholder dividends instead",
                effect: -1
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Yes, and provide more incentives for alternative energy production",
                effect: 1
            },
            {
                text: "No, provide more incentives for alternative energy production instead",
                effect: 1
            },
            {
                text: "No, and global warming is a natural occurrence",
                effect: -1
            },
            {
                text: "No, tax carbon emissions instead",
                effect: 1
            },
        ], [
            {
                text: "Yes",
                effect: 1
            },
            {
                text: "No",
                effect: -1
            },
            {
                text: "Yes, and legalize, tax, and regulate marijuana instead of criminalizing it",
                effect: 1
            },
            {
                text: "No, and increase penalties for non-violent drug offenders",
                effect: -1
            },
            {
                text: "Yes, but only for medical use",
                effect: 1
            },
            {
                text: "Yes, and immediately release anyone serving time solely for drug offenses",
                effect: 1
            },
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