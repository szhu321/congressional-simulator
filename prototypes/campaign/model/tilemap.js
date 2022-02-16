import Tile from "./tile.js";

export default class TileMap
{
    /**Creates a empty hexagonal tile map.*/
    constructor(rows, cols)
    {
        this.map = new Array(rows);
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
                    newTile.row = i;
                    newTile.col = j;
                    this.map[i][j] = newTile;
                }
                    
            }
        }
    }

    /**1 for fogOfWarMap, 2 for show all, 3 for occupy map.*/
    printMap(configNum)
    {
        let str = "";
        for(let i = 0; i < this.map.length; i++)
        {
            if(i % 2 == 1)
                str += " ";
            for(let j = 0; j < this.map[0].length; j++)
            {
                if(this.map[i][j] != null)
                {
                    switch(configNum)
                    {
                        case 1: {
                            if(this.map[i][j].visible)
                                str += this.map[i][j].numberOfVoters;
                            else
                                str += this.map[i][j].symbol;
                        }; break;
                        case 2: 
                            str += this.map[i][j].numberOfVoters;
                            break;
                        case 3: 
                            str += this.map[i][j].numberOfVoters;
                            break;
                        default:
                            str += this.map[i][j].numberOfVoters;
                    }
                }
                else 
                    str += " ";
                str += " ";
            }
            str += "\n";
        }
        console.log(str);
        return str;
    }

    getTileAt(row, col)
    {
        if(this.isOutOfBounds(row, col))
            return null;
        return this.map[row][col];
    }

    getLeftOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row;
        let newCol = tile.col - 1;
        return this.getTileAt(newRow, newCol);
    }

    getRightOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row;
        let newCol = tile.col + 1;
        return this.getTileAt(newRow, newCol);
    }

    getTopLeftOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row - 1;
        let newCol = tile.row % 2 == 0 ? tile.col - 1: tile.col;
        return this.getTileAt(newRow, newCol);
    }

    getTopRightOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row - 1;
        let newCol = tile.row % 2 == 0 ? tile.col: tile.col + 1;
        return this.getTileAt(newRow, newCol);
    }

    getBottomLeftOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row + 1;
        let newCol = tile.row % 2 == 0 ? tile.col - 1: tile.col;
        return this.getTileAt(newRow, newCol);
    }

    getBottomRightOfTile(tile)
    {
        if(!tile)
            return null;
        let newRow = tile.row + 1;
        let newCol = tile.row % 2 == 0 ? tile.col: tile.col + 1;
        return this.getTileAt(newRow, newCol);
    }
    
    /**Returns an array of neighbors starting from the top right going clockwise. */
    getAllNeighbors(tile)
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

    isOutOfBounds(row, col)
    {
        return this.map.length <= row || row < 0 || this.map[row].length <= col || col < 0;
    }
}