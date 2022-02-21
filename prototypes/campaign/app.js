import UserInput from './controller/userInput.js';
import Tile from './model/tile.js';
import TileMap from './model/tilemap.js';
import TileMapView from './view/tilemapview.js';
import TileView from './view/tileview.js';


let mapDisplay = document.querySelector("#map");
let input = document.querySelector("#input");
let tileDisplay = document.querySelector("#tile");


let tileMap = new TileMap(15,15);
let tileMapView = new TileMapView(mapDisplay);
let tileView = new TileView(tileDisplay);
tileMap.setViews(tileMapView);
let inputController = new UserInput();
inputController.setInputDOM(input);
inputController.setTileMapModel(tileMap);
inputController.setTileView(tileView);

// let tileAtZero = tileMap.getTileAt(0, 0);
// tileAtZero.symbol = "O";

// let neighbors1 = tileMap.getAllNeighbors(tileAtZero);
// for(let i = 0; i < neighbors1.length; i++)
// {
//     console.log(neighbors1[i]);
//     if(neighbors1[i])
//         neighbors1[i].symbol = "O";
// }

// tileMapView.drawMap(tileMap);


// tileMap.printMap();

//MVC format
//Map model stores the data and updates the mapview when the data changes.