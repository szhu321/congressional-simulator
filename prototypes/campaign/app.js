import UserInput from './controller/userInput.js';
import Tile from './model/tile.js';
import TileMap from './model/tilemap.js';
import TileMapView from './view/tilemapview.js';


let mapDisplay = document.querySelector("#map");
let input = document.querySelector("#input");


let tileMap = new TileMap(10, 10);
let tileMapView = new TileMapView(mapDisplay);
tileMap.setViews(tileMapView);
let inputController = new UserInput();
inputController.setInputDOM(input);
inputController.setTileMapModel(tileMap);

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