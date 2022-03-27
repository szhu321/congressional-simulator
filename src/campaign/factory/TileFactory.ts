import TileController from "../controller/TileController";
import Tile from "../model/Tile";
import CampaignScene from "../scenes/CampaignScene";
import TileView from "../view/TileView";

export default class TileFactory
{
    public static getTile(scene: CampaignScene): Tile
    {
        let verticalDiameter = 90;
        let color = 0xeeeeee;
        let points = this.polygonPoints(verticalDiameter);
        let tileModel = new Tile();
        let tileController = new TileController();
        let tileView = new TileView(scene, 0, 0, points, color, 0, 0);
        tileModel.setView(tileView);
        tileController.setTile(tileModel);
        tileView.setTileController(tileController);

        //add the tileView to the scene.
        scene.add.existing(tileView);

        return tileModel;
    }

    private static polygonPoints(verticalDiameter: number): any
    {
        let halfDiameter = verticalDiameter / 2;
        let cosTimesHalfDiameter = Math.cos(30 * Math.PI / 180) * halfDiameter;
        let sinTimesHalfDiameter = Math.sin(30 * Math.PI / 180) * halfDiameter;
        let points = [
            [0, -halfDiameter],
            [cosTimesHalfDiameter, -sinTimesHalfDiameter],
            [cosTimesHalfDiameter, sinTimesHalfDiameter],
            [0, halfDiameter],
            [-cosTimesHalfDiameter, sinTimesHalfDiameter],
            [-cosTimesHalfDiameter, -sinTimesHalfDiameter]
        ]
        return points;
    }

    private static polygonCalcHorizonalDiameter(verticalDiameter: number)
    {
        return Math.cos(30 * Math.PI / 180) * verticalDiameter;
    }
}