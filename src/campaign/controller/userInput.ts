//DEPRECATED

// export default class UserInput {
    
//     constructor()
//     {
//         this.inputDOM = null;
//         this.tileMapModel = null;
//         this.tileView = null;
//     }

//     setTileMapModel(map)
//     {
//         this.tileMapModel = map;
//     }
    
//     setTileView(tileView)
//     {
//         this.tileView = tileView;
//     }

//     setInputDOM(input)
//     {
//         this.inputDOM = input;
//         this.inputDOM.onkeydown = e => {
//             if(e.keyCode == 13) {
//                 this.handleKeyPress(this.inputDOM.value);
//                 this.inputDOM.value = "";
//             }
//         }
//     }

//     /**
//      * Commands: 
//      * play 1 2 - play a piece at row 1 and col 2
//      * display votes - displays the map with the votes
//      * display fog - displays the map with X's.
//      * restart - generate a new map.
//      * wait - let the map progress.
//      * @param {String} command - hello there.
//      */
//     handleKeyPress(command)
//     {
//         let args = this.parseCommand(command);
//         if(this.tileMapModel == null)
//             return;
//         switch(args[0])
//         {
//             case "play": {
//                 if(args[1] && args[2])
//                 {
//                     let row = parseInt(args[1]);
//                     let col = parseInt(args[2]);
//                     if(Number.isInteger(row) && Number.isInteger(col))
//                     {
//                         console.log(`Taking over tile at row ${row} and col ${col}.`);
//                         this.tileMapModel.updateSymbolOfTileAt(row, col, "O");
//                     }
//                     else
//                     {
//                         console.log("Incorrect Input.");
//                     }
//                 }
//             } break;
//             case "display": {
//                 if(args[1] == "votes")
//                 {
//                     console.log("Set display mode to votes");
//                     this.tileMapModel.setDisplayModeVotes();
//                 }
//                 if(args[1] == "fog")
//                 {
//                     console.log("Set display mode to fog");
//                     this.tileMapModel.setDisplayModeFog();
//                 }
//             } break;
//             case "restart":{
//                 this.tileMapModel.resetBoard();
//                 console.log("Restarted the map.");
//             } break;
//             case "wait":{
//                 let rowCols = this.tileMapModel.getRowAndColOfTilesWithSymbol("O");
//                 for(let rowCol of rowCols)
//                 {
//                     let neighbors = this.tileMapModel.getAllNeighbors(
//                         this.tileMapModel.getTileAt(rowCol[0], rowCol[1]));
//                     for(let i = 0; i < neighbors.length; i++)
//                     {
//                         if(neighbors[i])
//                         {
//                             let row = neighbors[i].row + 1;
//                             let col = neighbors[i].col + 1;
//                             this.tileMapModel.updateSymbolOfTileAt(row, col, "O");
//                         }
//                     }
//                 }
//                 console.log("Waited for a little bit.");
//             }break;
//             case "tile": {
//                 if(args[1] && args[2])
//                 {
//                     let row = parseInt(args[1]);
//                     let col = parseInt(args[2]);
//                     if(Number.isInteger(row) && Number.isInteger(col))
//                     {
//                         console.log(`Displaying information for tile at row ${row} and col ${col}.`);
//                         let tile = this.tileMapModel.getTileAt(row - 1,col - 1);
//                         if(tile)
//                         {
//                             this.tileView.drawTile(tile);
//                         }
//                     }
//                     else
//                     {
//                         console.log("Incorrect Input.");
//                     }
//                 }
//             }
//         }
//     }


//     parseCommand(command)
//     {
//         let startIdx = 0;
//         let args = [];
//         let newArg = false;
//         for(let i = 0; i < command.length; i++)
//         {
//             if(command.charAt(i) == " ")
//             {
//                 if(newArg)
//                 {
//                     args.push(command.substring(startIdx, i));
//                     startIdx = i + 1;
//                     newArg = false;
//                 }
//             }
//             else
//             {
//                 if(newArg == false)
//                     startIdx = i;
//                 newArg = true;
//             }
//         }
//         if(startIdx < command.length)
//         {
//             args.push(command.substring(startIdx));
//         }
//         return args;
//     }
    
// }