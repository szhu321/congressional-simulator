export default class Card {
    constructor(scene) {

        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setScale(0.6, 0.6).setInteractive();
            card.setData({dropZoneName : "", dropZoneX: 0, dropZoneY: 0, cost: 100});
            scene.input.setDraggable(card);
            return card;
        }
    }
}