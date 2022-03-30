
export default class TileMapView
{
    constructor(domElement)
    {
        this.domElement = domElement;
    }

    drawMap(tileMap, mode = 0)
    {
        if(mode == 0)
            this.domElement.innerHTML = this.getHtmlText(tileMap, mode);
        else if(mode == 1)
            this.domElement.innerHTML = this.getHtmlText(tileMap, mode);
    }

    getHtmlText(tileMap, configNum = 0)
    {
        let htmlStr = "";
        for(let i = 0; i < tileMap.length; i++)
        {
            let rowStr = "";
            for(let j = 0; j < tileMap[0].length; j++)
            {
                if(tileMap[i][j] != null)
                {
                    switch(configNum)
                    {
                        case 0: {
                            rowStr += tileMap[i][j].symbol;
                        }; break;
                        case 1: 
                            rowStr += tileMap[i][j].numberOfVoters;
                            break;
                        case 2: 
                            rowStr += tileMap[i][j].numberOfVoters;
                            break;
                        default:
                            rowStr += tileMap[i][j].numberOfVoters;
                    }
                }
                else 
                rowStr += " ";
                rowStr += " ";
            }

            if(i % 2 == 1)
                htmlStr += "&nbsp;" + rowStr + "<br>";
            else
                htmlStr += rowStr + "<br>";         
        }
        return htmlStr;
    }
}
