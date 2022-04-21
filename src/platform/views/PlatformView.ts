import PlatformController from "../controllers/PlatformController";
import Button from '../../phaserobjs/Button';
import PlatformModel from "../models/PlatformModel";
import PlayerData from "../../data/PlayerData";
import { POLITICAL_PARTY } from "../../gameenums";

export default class PlatformView extends Phaser.GameObjects.Container{
    private controller: PlatformController;
    private questionText: Phaser.GameObjects.Text;
    private answers: Button[];
    private retryButton: Button;

    constructor(scene: Phaser.Scene){
        super(scene);
        this.controller = null;
        this.questionText = null;
        this.answers = [];
        this.retryButton = null;
    }

    setController(controller: PlatformController){
        this.controller = controller;
    }

    initialize(model: PlatformModel){
        // let questionIndex = Math.floor(Math.random() * model.getQuestions().length);
        let question = model.getQuestions()[0];

        this.questionText = this.scene.add.text(700, 100, question.getText()).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.questionText.setOrigin(0.5, 0.5);
        this.questionText.setAlign("center");

        let answers = question.getAnswers();
        for(let i = 0; i < answers.length; i++){
            let answer = new Button(this.scene, 700, 150 + 75 * i, 900, 50);
            answer.getText().setText(answers[i].getText());
            answer.setOnclickCallback(() => {
                console.log("Quiz answer");
                // this.selectAnswer(answers[i].getText());
                this.controller.selectAnswer(model.getQuestions().indexOf(question), i);
            })
            this.add(answer);
            this.answers.push(answer);
        }

        this.retryButton = new Button(this.scene, 700, 350, 500, 50);
        this.retryButton.getText().setText("Answer Another Question");
        this.retryButton.setOnclickCallback(() => {
            // model.chooseNewQuestion();
        })
        this.retryButton.setVisible(false);

        this.add(this.questionText);
        this.add(this.retryButton);
    }

    selectAnswer(answer: string){
        for(let i = 0; i < this.answers.length; i++){
            // this.remove(this.answers[i]);
            this.answers[i].setVisible(false);
        }
        this.answers.splice(0, this.answers.length);
        this.questionText.setText(`You selected\n\"${answer}\"`);
        this.retryButton.setVisible(true);
    }

    setNewQuestion(model: PlatformModel, effect: number){
        for(let i = 0; i < this.answers.length; i++){
            this.remove(this.answers[i]);
            this.answers[i].setVisible(false);
        }
        this.answers.splice(0, this.answers.length);
        let currentQuestion = model.getCurrentQuestion();
        if(currentQuestion < 2){
            let question = model.getQuestions()[currentQuestion];
            this.questionText.setText(question.getText());

            let answers = question.getAnswers();
            for(let i = 0; i < answers.length; i++){
                let answer = new Button(this.scene, 700, 150 + 75 * i, 900, 50);
                answer.getText().setText(answers[i].getText());
                answer.setOnclickCallback(() => {
                    console.log("Quiz answer");
                    this.controller.selectAnswer(model.getQuestions().indexOf(question), i);
                })
                this.add(answer);
                this.answers.push(answer);
            }
        }else if(currentQuestion >= 2){
            if(model.getShowNextQuestion()){
                let question = model.getQuestions()[currentQuestion];
                this.questionText.setText(question.getText());

                let answers = question.getAnswers();
                for(let i = 0; i < answers.length; i++){
                    let answer = new Button(this.scene, 700, 150 + 75 * i, 900, 50);
                    answer.getText().setText(answers[i].getText());
                    answer.setOnclickCallback(() => {
                        console.log("Quiz answer");
                        this.controller.selectAnswer(model.getQuestions().indexOf(question), i);
                    })
                    this.add(answer);
                    this.answers.push(answer);
                }
            }else{
                if(currentQuestion == 2){
                    this.questionText.setText(`You are running in the ${PlayerData.getPlayer().getPoliticalParty()} in District ${PlayerData.getPlayer().getDistrict()} of New York.`);
                }else{
                    let politicalParty = PlayerData.getPlayer().getPoliticalParty();
                    if(politicalParty == POLITICAL_PARTY.DEMOCRATIC_PARTY){
                        this.questionText.setText(`The Democratic Party is ${effect > 0 ? "pleased" : "upset"} with your answer.`);
                    }else{
                        this.questionText.setText(`The Republican Party is ${effect > 0 ? "pleased" : "upset"} with your answer.`);
                    }
                }
            }
        }
    }
}