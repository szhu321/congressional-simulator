import TileMapController from "../controller/TileMapController";
import Tile from "../model/Tile";
import TileMap from "../model/TileMap";
import CampaignScene from "../scenes/CampaignScene";
import TileMapView from "../view/TileMapView";
import TileView from "../view/TileView";
import TileFactory from "./TileFactory";

export enum TileMapType {
    DEFAULT = "default",
    SMALL = "small",
    LARGE = "large"
}

export default class TileMapFactory
{
    
    /**
     * Creates the tileMap along with it's controller and view attached.
     * The view will be added to the provided scene.
     * @param scene - A reference to the campaign scene.
     * @param type - The size of the map.
     * @returns {TileMap} The tileMap.
     */
    public static getTileMap(scene: CampaignScene, type: TileMapType = TileMapType.DEFAULT): TileMap
    {
        let tileMap = new TileMap(this.getRowCount(type), this.getColCount(type));
        let tileMapView = new TileMapView(scene);
        let tileMapController = new TileMapController(scene);

        //initialize the tiles based on the tiles inside tileMap.
        let map = this.generateNewMap(scene, tileMap.getRows(), tileMap.getCols());
        tileMap.populateMap(map);

        //store in tileMapView an 2D array of all the tileViews.
        let tileMapViews = new Array<TileView[]>(map.length);
        for(let row = 0; row < map.length; row++)
        {
            tileMapViews[row] = new Array<TileView>(map[row].length);
            for(let col = 0; col < map[row].length; col++)
            {
                if(map[row][col] != null)
                    tileMapViews[row][col] = map[row][col].getView();
            }
        }
        tileMapView.setTileMapViews(tileMapViews);
        this.initializeTileViewPositions(map);

        tileMap.setView(tileMapView);
        tileMapView.setTileMapController(tileMapController);
        tileMapController.setMapModel(tileMap);

        scene.add.existing(tileMapView);
        
        return tileMap;
    }

    private static generateNewMap(scene: CampaignScene, rows: number, cols: number): Tile[][]
    {
        let map = Array<Tile[]>(rows);
        for(let i = 0; i < rows; i++)
        {
            map[i] = new Array<Tile>(cols);
            for(let j = 0; j < cols; j++)
            {
                if(i % 2 == 1 && j == cols - 1)
                    map[i][j] = null;
                else
                {
                    let newTile = TileFactory.getTile(scene);
                    newTile.setRow(i);
                    newTile.setCol(j);
                    newTile.getView().setRow(i);
                    newTile.getView().setCol(j);
                    map[i][j] = newTile;
                }  
            }
        }
        return map;
    }


    private static initializeTileViewPositions(tileMap: Tile[][])
    {
        let startX = 700;
        let startY = 110;
        let verticalDiameter = 90;
        let gapBetweenTiles = 6;
        // //selected hexagon
        // let selectedStrokeColor = 0xedeb4e;
        // this.selectedHexagonOverlay = this.add.polygon(0, 0, points, 0x000000, 0.1);
        // this.selectedHexagonOverlay.setOrigin(0.5, 0.5);
        // this.selectedHexagonOverlay.setStrokeStyle(tileStrokeSize, selectedStrokeColor);
        // this.selectedHexagonOverlay.setVisible(false);
        // this.selectedHexagonOverlay.setDepth(2);

        for(let row = 0; row < tileMap.length; row++)
        {
            for(let col = 0; col < tileMap[row].length; col++)
            {
                let tile = tileMap[row][col];
                if(tile != null)
                {
                    let x = startX + this.polygonCalcHorizonalDiameter(verticalDiameter) * col + (gapBetweenTiles * col);
                    let y = startY + ((verticalDiameter/2)+Math.sin(30*Math.PI/180)*(verticalDiameter/2)) * row + (gapBetweenTiles * row);
                    if(row % 2 == 1)
                    {
                        x += Math.cos(30*Math.PI/180) * verticalDiameter /2 + gapBetweenTiles / 2;
                    }
                    tile.getView().setPosition(x, y);
                }
            }
        }
    }

    private static polygonCalcHorizonalDiameter(verticalDiameter: number)
    {
        return Math.cos(30 * Math.PI / 180) * verticalDiameter;
    }

    private static getRowCount(type: TileMapType)
    {
        switch(type)
        {
            case TileMapType.SMALL: return 5;
            case TileMapType.LARGE: return 12;
        }
        return 8;
    }

    private static getColCount(type: TileMapType)
    {
        switch(type)
        {
            case TileMapType.SMALL: return 5;
            case TileMapType.LARGE: return 12;
        }
        return 8;
    }
}