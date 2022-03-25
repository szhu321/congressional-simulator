import TileView from "../view/TileView";

export default class Tile
{
    private numberOfVoters: number;
    private workerOnTile: boolean;
    private symbol: string;
    private visible: boolean;
    private row: number;
    private col: number;
    private ecomony: number;
    private healthcare: number;
    private education: number;
    private taxes: number;
    private environment: number;
    private view: TileView;
    private listOccupied: any;


    constructor()
    {
        this.numberOfVoters = Math.floor((Math.random() * 9)) + 1;
        this.listOccupied = [];
        this.workerOnTile = false;
        this.symbol = "X";
        this.visible = false;
        this.row = 0;
        this.col = 0;
        this.ecomony = Math.round(((Math.random() * 2) - 1) * 100) / 100;
        this.healthcare = Math.round(((Math.random() * 2) - 1) * 100) / 100;
        this.education = Math.round(((Math.random() * 2) - 1) * 100) / 100;
        this.taxes = Math.round(((Math.random() * 2) - 1) * 100) / 100;
        this.environment = Math.round(((Math.random() * 2) - 1) * 100) / 100;
        this.view;
    }

    public getNumberOfVoters(): number {return this.numberOfVoters;}
    public setNumberOfVoters(value: number) {this.numberOfVoters = value;}
    public isWorkerOnTile(): boolean {return this.workerOnTile;}
    public setWorkerOnTile(value: boolean) {this.workerOnTile = value;}
    public getSymbol(): string {return this.symbol;}
    public setSymbol(value: string) {this.symbol = value;}
    public isVisible(): boolean {return this.visible;}
    public setVisible(value: boolean) {this.visible = value;}
    public getRow(): number {return this.row;}
    public setRow(value: number){this.row = value;}
    public getCol(): number {return this.col;}
    public setCol(value: number) {this.col = value;}
    public getEconomy(): number {return this.ecomony;}
    public setEconomy(value: number) {this.ecomony = value};
    public getHealthcare(): number {return this.healthcare;}
    public setHealthcare(value: number) {this.healthcare = value};
    public getEducation(): number {return this.education;}
    public setEducation(value: number) {this.education = value};
    public getTaxes(): number {return this.taxes;}
    public setTaxes(value: number) {this.taxes = value};
    public getEnvironment(): number {return this.environment;}
    public setEnvironment(value: number) {this.environment = value};

    public setView(view: TileView): void
    {
        this.view = view;
        this.updateView();
    }

    public updateView()
    {
        if(this.view)
            this.view.updateView(this);
    }

    public percentageOccupied(): number
    {
        return this.totalOccupied() / this.numberOfVoters;
    }

    public addWorkerToTile(worker: Worker)
    {
        if(worker)
        {
            //TODO: create a worker class.
        }
        this.workerOnTile = true;
        this.updateView();
    }

    public isFullyOccupied(): boolean
    {
        if(this.totalOccupied() >= this.numberOfVoters)
        {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param name - The name of the player that is occpying this tile.
     * @param amount - The amount of votes that the player will occupy.
     * @returns The actual number of votes that the player occupied.
     */
    public occupy(name: string, amount: number): number
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
        this.updateView();
        return amount;
    }

    /**
     * 
     * @returns {number} The total number of voters that's been occupied.
     */
    public totalOccupied(): number
    {
        let sum = 0;
        for(let key in this.listOccupied)
        {
            sum += this.listOccupied[key];
        }
        return sum;
    }


}
