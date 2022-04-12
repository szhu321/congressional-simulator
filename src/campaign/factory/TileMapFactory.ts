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
     * @param population - The total population of the tile map.
     * @returns {TileMap} The tileMap.
     */
    public static getTileMap(scene: CampaignScene, type: TileMapType = TileMapType.DEFAULT, population: number = 5000): TileMap
    {
        let tileMap = new TileMap(this.getRowCount(type), this.getColCount(type));
        let tileMapView = new TileMapView(scene);
        let tileMapController = new TileMapController(scene);

        //initialize the tiles based on the tiles inside tileMap.
        let map = this.generateNewMap(scene, tileMap.getRows(), tileMap.getCols(), population);
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

    private static generateNewMap(scene: CampaignScene, rows: number, cols: number, population: number): Tile[][]
    {
        //let populationDistribution = [][];

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
                    let newTile = TileFactory.getTile(scene, Math.floor(population / (rows * cols)));
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

    //TODO: generate a random map with different population distrubution.
    private static createMapLayout(rows: number, cols: number): TileMapStructure
    {
        let struct = new TileMapStructure(rows, cols);
        
        let denseAreas = 5;

        //set population density to one.
        for(let i = 0; i < rows; i++)
            for(let j = 0; j < cols; j++)
                struct.getTileAt(i, j).populationDensityNumber = 1;

        //pick some locations that will be dense.
        while(denseAreas > 0)
        {
            let randomCol = Math.floor(Math.random() * cols);
            let randomRow = Math.floor(Math.random() * rows);

            let randomTile = struct.getTileAt(randomRow, randomCol);
            if(randomTile.isDead == false)
            {
                //TODO: finish logic.
            }
            denseAreas--;
        }
        

        return struct;
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
            case TileMapType.SMALL: return 6;
            case TileMapType.LARGE: return 12;
        }
        return 8;
    }

    private static getColCount(type: TileMapType)
    {
        switch(type)
        {
            case TileMapType.SMALL: return 6;
            case TileMapType.LARGE: return 12;
        }
        return 8;
    }
}

class TileStructure
{
    public isDead: boolean; //dead tile.
    public isClaimable: boolean; //is this tile active. If it is not claimable then it is a empty tile.
    public population: number;
    public populationPercentage: number;
    public populationDensityNumber: number;
    public row: number;
    public col: number;

    public getRow(): number {return this.row;}
    public getCol(): number {return this.col;}
}

class TileMapStructure
{
    public map: TileStructure[][];

    constructor(rows: number, cols:number)
    {
        this.map = new Array<TileStructure[]>(rows);
        for(let i = 0; i < rows; i++)
        {
            this.map[i] = new Array<TileStructure>(cols);
            for(let j = 0; j < cols; j++)
            {
                this.map[i][j] = new TileStructure();
                if(i % 2 == 1 && j == cols - 1)
                    this.map[i][j].isDead = true;
                else
                    this.map[i][j].isDead = false;
                
                this.map[i][j].row = i;
                this.map[i][j].col = j;
            }
        }
    }

    public getTileAt(row: number, col: number): TileStructure
    {
        if(this.isOutOfBounds(row, col))
            return null;
        return this.map[row][col];
    }

    public getLeftOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow();
        let newCol = tile.getCol() - 1;
        return this.getTileAt(newRow, newCol);
    }

    public getRightOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow();
        let newCol = tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }

    public getTopLeftOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() - 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol() - 1: tile.getCol();
        return this.getTileAt(newRow, newCol);
    }

    public getTopRightOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() - 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol(): tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }

    public getBottomLeftOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() + 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol() - 1: tile.getCol();
        return this.getTileAt(newRow, newCol);
    }

    public getBottomRightOfTile(tile: TileStructure): TileStructure
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() + 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol(): tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }
    
    /**Returns an array of neighbors starting from the top right going clockwise. */
    public getAllNeighbors(tile: TileStructure): TileStructure[]
    {
        if(tile == null)
            return null;
        let neighbors = new Array(6);
        neighbors[0] = this.getTopRightOfTile(tile);
        neighbors[1] = this.getRightOfTile(tile);
        neighbors[2] = this.getBottomRightOfTile(tile);
        neighbors[3] = this.getBottomLeftOfTile(tile);
        neighbors[4] = this.getLeftOfTile(tile);
        neighbors[5] = this.getTopLeftOfTile(tile);
        return neighbors;
    }

    public isOutOfBounds(row: number, col: number): boolean
    {
        return this.map.length <= row || row < 0 || this.map[row].length <= col || col < 0;
    }
}