import Tile from './model/tile.js';
import TileMap from './model/tilemap.js';

let tile = new Tile();
console.log(tile.numberOfVoters);


let tileMap = new TileMap(10, 10);
tileMap.printMap();

console.log("Set tile at 0,0 to O");

let tileAtZero = tileMap.getTileAt(0, 0);
tileAtZero.symbol = "O";

let neighbors1 = tileMap.getAllNeighbors(tileAtZero);
for(let i = 0; i < neighbors1.length; i++)
{
    console.log(neighbors1[i]);
}


tileMap.printMap();
