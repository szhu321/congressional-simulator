export default class Zone {
    constructor(scene) {
        this.renderZone = (x, y) => {
            let dropZone = scene.add.zone(x, y, 900, 200).setRectangleDropZone(900, 200);
            dropZone.setData({ cards: 0, cardList: [] });
            //dropZone.disableInteractive();
            return dropZone;
        };
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            //dropZoneOutline.setDepth(-2);
            dropZoneOutline.lineStyle(4, 0xff69b4);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
            dropZoneOutline.disableInteractive();
            //dropZoneOutline.fillRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }
    }
}