
/**
 * A content is a phaser container that has a background built into it.
 */
export default class Content extends Phaser.GameObjects.Container
{
    private background: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x:number = 0, y:number = 0, width:number = 500, height:number = 500)
    {
        super(scene);
        this.background = scene.add.rectangle(0, 0, width, height, 0x111111);
        this.add(this.background);
    }

    public getBackground(): Phaser.GameObjects.Rectangle {return this.background;}
}
