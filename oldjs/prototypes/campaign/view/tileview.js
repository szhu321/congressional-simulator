

export default class TileView
{
    constructor(domElement)
    {
        this.domElement = domElement;
    }

    drawTile(tile, mode = 0)
    {
        this.domElement.innerHTML = this.getHTMLText(tile);
    }

    getHTMLText(tile)
    {
        let str = "";
        str += `Location(row, col): (${tile.row + 1}, ${tile.col + 1}) <br>`;
        str += `Symbol: ${tile.symbol}<br>`;
        str += `Political Stance (-1 <- Liberal Conservative -> 1): <br>`;
        str += `Economy: ${tile.ecomony} <br>`;
        str += `Healthcare: ${tile.healthcare} <br>`;
        str += `Education: ${tile.education} <br>`;
        str += `Taxes: ${tile.taxes} <br>`;
        str += `Environment: ${tile.environment}`;
        return str;
    }
}