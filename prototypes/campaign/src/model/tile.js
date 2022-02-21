
class Tile
{
    constructor()
    {
        this.numberOfVoters = Math.floor((Math.random() * 9)) + 1;
        this.listOccupied = {};
        this.symbol = "X";
        this.visible = false;
        this.row = 0;
        this.col = 0;
    }

    occupy(name, amount)
    {
        let overflow = this.totalOccupied() - this.numberOfVoters + amount;
        if(overflow > 0)
        {
            amount -= overflow;
        }
        if(this.listOccupied[name])
            this.listOccupied[name] += amount;
        else
            this.listOccupied[name] = amount;
        return amount;
    }

    totalOccupied()
    {
        let sum = 0;
        for(let key in this.listOccupied)
        {
            sum += this.listOccupied[key];
        }
        return sum;
    }
}

export default Tile;

