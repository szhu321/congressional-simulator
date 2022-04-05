export default class Zone {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    renderZone = (x: number, y: number) => {
        let dropZone = this.scene.add.zone(x, y, 900, 150).setRectangleDropZone(900, 150);
        dropZone.setData({ cards: 0, cardList: [] });
        return dropZone;
    }

    renderOutline = (dropZone: Phaser.GameObjects.Zone) => {
        let dropZoneOutline = this.scene.add.graphics();
        dropZoneOutline.lineStyle(4, 0xff69b4);
        dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        dropZoneOutline.disableInteractive();
    }
}