import TileMapView from "../view/TileMapView";
import Tile from "./Tile";

export default class TileMap
{
    private map: Tile[][];
    private view: TileMapView;
    private rows: number;
    private cols: number;
    private displayMode: number;

    /**Creates a empty hexagonal tile map.*/
    constructor(rows: number = 20, cols: number = 20)
    {
        this.map = null;
        this.view = null;
        this.rows = rows;
        this.cols = cols;
        this.displayMode = 0;
        this.generateNewMap(rows, cols);
    }

    public getRows(): number {return this.rows;}
    public getCols(): number {return this.cols;}

    public generateNewMap(rows: number, cols: number):void
    {
        this.map = Array(rows);
        //initialize the map hexagonal grid to 0,0.
        for(let i = 0; i < rows; i++)
        {
            this.map[i] = new Array(cols);
            for(let j = 0; j < cols; j++)
            {
                if(i % 2 == 1 && j == cols - 1)
                    this.map[i][j] = null;
                else
                {
                    let newTile = new Tile();
                    newTile.setRow(i);
                    newTile.setCol(j);
                    this.map[i][j] = newTile;
                }  
            }
        }
    }

    public setViews(views: any)
    {
        this.view = views;
        this.updatesView();
    }

    public updatesView()
    {
        if(this.view == null)
            return;
        this.view.drawMap(this, this.displayMode);
    }

    /**
     * Updates the tile at the specified row and col with the provided symbol.
     */
    public updateSymbolOfTileAt(row: number, col: number, symbol: string = "O")
    {
        let tile = this.getTileAt(row - 1, col - 1);
        if(tile)
        {
            tile.setSymbol(symbol);
            // tile.symbol = symbol;
            this.updatesView();
        }
    }

    /**
     * 
     * @param {string} symbol - The symbol to find.
     * @returns An array of [row, col] that tells which of the tiles have the provided symbol.
     */
    public getRowAndColOfTilesWithSymbol(symbol: string): number[][]
    {
        if(!symbol)
            return null;
        let arr = [];
        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < this.cols; j++)
            {
                if(this.map[i][j] && this.map[i][j].getSymbol() == symbol)
                {
                    arr.push([i, j]);
                }
            }
        }
        return arr;
    }

    public setDisplayModeFog()
    {
        this.displayMode = 0;
        this.updatesView();
    }

    public setDisplayModeVotes()
    {
        this.displayMode = 1;
        this.updatesView();
    }

    public resetBoard()
    {
        this.generateNewMap(this.rows, this.cols);
        this.updatesView();
    }

    public getTileAt(row: number, col: number): Tile
    {
        if(this.isOutOfBounds(row, col))
            return null;
        return this.map[row][col];
    }

    public getLeftOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow();
        let newCol = tile.getCol() - 1;
        return this.getTileAt(newRow, newCol);
    }

    public getRightOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow();
        let newCol = tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }

    public getTopLeftOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() - 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol() - 1: tile.getCol();
        return this.getTileAt(newRow, newCol);
    }

    public getTopRightOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() - 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol(): tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }

    public getBottomLeftOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() + 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol() - 1: tile.getCol();
        return this.getTileAt(newRow, newCol);
    }

    public getBottomRightOfTile(tile: Tile): Tile
    {
        if(!tile)
            return null;
        let newRow = tile.getRow() + 1;
        let newCol = tile.getRow() % 2 == 0 ? tile.getCol(): tile.getCol() + 1;
        return this.getTileAt(newRow, newCol);
    }
    
    /**Returns an array of neighbors starting from the top right going clockwise. */
    public getAllNeighbors(tile: Tile): Tile[]
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