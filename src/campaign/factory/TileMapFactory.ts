import DemographicsData from "../../data/statistics/DemographicsData";
import DistrictData, { StateEnum } from "../../data/statistics/DistrictData";
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
    public static getTileMap(scene: CampaignScene, type: TileMapType = TileMapType.DEFAULT, district: DistrictData = null, population: number = 5000): TileMap
    {
        let tileMap = new TileMap(this.getRowCount(type), this.getColCount(type));
        let tileMapView = new TileMapView(scene);
        let tileMapController = new TileMapController(scene);

        if(!district)
            district = new DistrictData(0, StateEnum.NEW_YORK, new DemographicsData(100000, 20000, 2000));

        //initialize the tiles based on the tiles inside tileMap.
        let map = this.generateNewMap(scene, tileMap.getRows(), tileMap.getCols(), district);
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

    private static generateNewMap(scene: CampaignScene, rows: number, cols: number, district: DistrictData): Tile[][]
    {
        let mapDensityLayout = this.createMapLayout(rows, cols);

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
                    let totalPop = Math.floor(district.getDemographics().getTotalPopulation() * mapDensityLayout.getTileAt(i,j).populationPercentage);
                    let democraticPartisans = Math.floor(district.getDemographics().getDemocraticVoters() * mapDensityLayout.getTileAt(i, j).democraticPartisanPercentage);
                    let republicanPartisans = Math.floor(district.getDemographics().getRepublicanVoters() * mapDensityLayout.getTileAt(i, j).republicanPartisanPercentage);
                    let newTile = TileFactory.getTile(scene, totalPop);
                    newTile.setRow(i);
                    newTile.setCol(j);
                    newTile.getView().setRow(i);
                    newTile.getView().setCol(j);
                    newTile.setNumberOfDemocraticPartisans(democraticPartisans);
                    newTile.setNumberOfRepublicanPartisans(republicanPartisans);
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
        
        //there will be 5 denseareas.
        let denseAreas = 5;

        //set population density to 0. as well as republican and democratic partisan numbers.
        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                let tile = struct.getTileAt(i, j);
                if(tile)
                {
                    tile.populationDensityNumber = 0;
                    tile.republicanPartisanDensityNumber = 0;
                    tile.democraticPartisanDensityNumber = 0;
                }
            }
        }
        //pick some locations that will be dense.
        while(denseAreas > 0)
        {
            let randomCol = Math.floor(Math.random() * cols);
            let randomRow = Math.floor(Math.random() * rows);

            let randomTile = struct.getTileAt(randomRow, randomCol);
            if(randomTile.isDead == false)
            {
                //TODO: finish logic.
                for(let i = 5; i >= 0; i--)
                {
                    struct.spreadPopulationDensityAt(randomRow, randomCol, i);
                }
            }
            denseAreas--;
        }

        //calculate the percentages
        let totalPopulationDensity = 1;
        let totalRepublicanPartisanDensity = 1;
        let totalDemocraticPartisanDensity = 1;

        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                let tile = struct.getTileAt(i, j);
                if(tile)
                {
                    totalPopulationDensity += tile.populationDensityNumber;
                    totalRepublicanPartisanDensity += tile.republicanPartisanDensityNumber;
                    totalDemocraticPartisanDensity += tile.democraticPartisanDensityNumber;
                }
            }
        }

        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                let tile = struct.getTileAt(i, j);
                if(tile)
                {
                    tile.populationPercentage = tile.populationDensityNumber / totalPopulationDensity;
                    tile.republicanPartisanPercentage = tile.republicanPartisanDensityNumber / totalRepublicanPartisanDensity;
                    tile.democraticPartisanPercentage = tile.democraticPartisanDensityNumber / totalDemocraticPartisanDensity;
                }
            }
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
    public republicanPartisanPercentage: number;
    public democraticPartisanPercentage: number;
    public populationDensityNumber: number;
    public republicanPartisanDensityNumber: number;
    public democraticPartisanDensityNumber: number;
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

    /**
     * Perform a even distribution of numbers to the area specified.
     * The spread determines how far from the selected tile do the numbers go.
     * @param row - The row.
     * @param col - The col.
     * @param spread - The spread. How far the number spreads.
     */
    public spreadRepublicanPartisanDensityAt(row: number , col: number, spread: number = 0)
    {
        let tile = this.getTileAt(row, col);
        if(tile == null)
            return;
        //add one to the republican partisan density to the current tile and to neighboring tiles.
        let visited = new Array<TileStructure>(); //stores the tiles that were processed.

        if(spread < 0)
            spread = 0;
        
        let searchQueue = new Array<TileStructure>();
        let searchQueueRange = new Array<number>();
        searchQueue.push(tile);
        searchQueueRange.push(0);
        while(searchQueue.length > 0)
        {
            let currentTile = searchQueue.shift();
            let currentTileRange = searchQueueRange.shift();
            //add one to the current tile.
            //add this tile to the searched already list.
            currentTile.republicanPartisanDensityNumber++;
            let neighbors = this.getAllNeighbors(currentTile);
            for(let neighbor of neighbors)
            {
                let neighborRange = currentTileRange + 1;
                if(neighbor != null)
                {
                    if(neighborRange <= spread && visited.indexOf(neighbor) === -1)
                    {
                        searchQueue.push(neighbor);
                        searchQueueRange.push(neighborRange);
                    }
                }
            }
            visited.push(currentTile);
        }
    }


    /**
     * Perform a even distribution of numbers to the area specified.
     * The spread determines how far from the selected tile do the numbers go.
     * @param row - The row.
     * @param col - The col.
     * @param spread - The spread. How far the number spreads.
     */
    public spreadPopulationDensityAt(row: number , col: number, spread: number = 0)
    {
        let tile = this.getTileAt(row, col);
        if(tile == null)
            return;
        //add one to the republican partisan density to the current tile and to neighboring tiles.
        let visited = new Array<TileStructure>(); //stores the tiles that were processed.

        if(spread < 0)
            spread = 0;
        
        let searchQueue = new Array<TileStructure>();
        let searchQueueRange = new Array<number>();
        searchQueue.push(tile);
        searchQueueRange.push(0);
        while(searchQueue.length > 0)
        {
            let currentTile = searchQueue.shift();
            let currentTileRange = searchQueueRange.shift();
            //add one to the current tile.
            //add this tile to the searched already list.
            currentTile.populationDensityNumber++;
            let neighbors = this.getAllNeighbors(currentTile);
            for(let neighbor of neighbors)
            {
                let neighborRange = currentTileRange + 1;
                if(neighbor != null)
                {
                    if(neighborRange <= spread && visited.indexOf(neighbor) === -1)
                    {
                        searchQueue.push(neighbor);
                        searchQueueRange.push(neighborRange);
                    }
                }
            }
            visited.push(currentTile);
        }
    }

    /**
     * Perform a even distribution of numbers to the area specified.
     * The spread determines how far from the selected tile do the numbers go.
     * @param row - The row.
     * @param col - The col.
     * @param spread - The spread. How far the number spreads.
     */
    public spreadDemocraticPartisanDensityAt(row: number , col: number, spread: number = 0)
    {
        let tile = this.getTileAt(row, col);
        if(tile == null)
            return;
        //add one to the republican partisan density to the current tile and to neighboring tiles.
        let visited = new Array<TileStructure>(); //stores the tiles that were processed.

        if(spread < 0)
            spread = 0;
        
        let searchQueue = new Array<TileStructure>();
        let searchQueueRange = new Array<number>();
        searchQueue.push(tile);
        searchQueueRange.push(0);
        while(searchQueue.length > 0)
        {
            let currentTile = searchQueue.shift();
            let currentTileRange = searchQueueRange.shift();
            //add one to the current tile.
            //add this tile to the searched already list.
            currentTile.democraticPartisanDensityNumber++;
            let neighbors = this.getAllNeighbors(currentTile);
            for(let neighbor of neighbors)
            {
                let neighborRange = currentTileRange + 1;
                if(neighbor != null)
                {
                    if(neighborRange <= spread && visited.indexOf(neighbor) === -1)
                    {
                        searchQueue.push(neighbor);
                        searchQueueRange.push(neighborRange);
                    }
                }
            }
            visited.push(currentTile);
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