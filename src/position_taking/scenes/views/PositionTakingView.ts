import PositionTakingController from "../controllers/PositionTakingController";
import Button from '../../../phaserobjs/Button';
import PositionTakingModel from "../models/PositionTakingModel";

export default class PositionTakingView extends Phaser.GameObjects.Container{
    private controller: PositionTakingController;
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

    setController(controller: PositionTakingController){
        this.controller = controller;
    }

    initialize(model: PositionTakingModel){
        let questionIndex = Math.floor(Math.random() * model.getQuestions().length);
        let question = model.getQuestions()[questionIndex];

        this.questionText = this.scene.add.text(700, 100, question.getText()).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');
        this.questionText.setOrigin(0.5, 0.5);
        this.questionText.setAlign("center");

        let answers = question.getAnswers();
        for(let i = 0; i < answers.length; i++){
            let answer = new Button(this.scene, 700, 200 + 75 * i, 900, 50);
            answer.getText().setText(answers[i].getText());
            answer.setOnclickCallback(() => {
                console.log("Quiz answer");
                this.selectAnswer(answers[i].getText());
            })
            this.add(answer);
            this.answers.push(answer);
        }

        this.retryButton = new Button(this.scene, 700, 350, 500, 50);
        this.retryButton.getText().setText("Get Another Question");
        this.retryButton.setOnclickCallback(() => {
            model.chooseNewQuestion();
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

    setNewQuestion(model: PositionTakingModel){
        let questionIndex = Math.floor(Math.random() * model.getQuestions().length);
        let question = model.getQuestions()[questionIndex];
        this.questionText.setText(question.getText());

        let answers = question.getAnswers();
        for(let i = 0; i < answers.length; i++){
            let answer = new Button(this.scene, 700, 200 + 75 * i, 900, 50);
            answer.getText().setText(answers[i].getText());
            answer.setOnclickCallback(() => {
                console.log("Quiz answer");
                this.selectAnswer(answers[i].getText());
            })
            this.add(answer);
            this.answers.push(answer);
        }

        this.retryButton.setVisible(false);
    }
}