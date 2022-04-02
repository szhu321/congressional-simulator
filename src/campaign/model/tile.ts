import { CANDIDATE } from "../campaignenum";
import TileView from "../view/TileView";
import Worker from "./Worker";

export default class Tile
{
    private numberOfVoters: number;
    //private workerOnTile: boolean;
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

    private workers: Worker[];
    private listOccupied: CandidateInfo[];


    constructor()
    {
        this.numberOfVoters = Math.floor((Math.random() * 2000)) + 50;
        this.listOccupied = new Array<CandidateInfo>();
        this.workers = new Array<Worker>();
        //this.workerOnTile = false;
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
    public isWorkerOnTile(): boolean {
        return this.workers.length > 0;
    }
    // public setWorkerOnTile(value: boolean) {this.workerOnTile = value;}
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

    public getView(): TileView
    {
        return this.view;
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

    public addWorker(worker: Worker)
    {
        if(!worker)
        {
            console.log("Error, Worker is null");
        }
        this.workers.push(worker);
        //this.workerOnTile = true;
        this.updateView();
    }

    public removeWorker(worker: Worker)
    {
        let idx = this.workers.indexOf(worker);
        if(idx == -1)
            console.log("Error, failed to remove worker. Worker does not exist in tile.");
        this.workers.splice(idx, 1);
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
    public occupy(candidate: CANDIDATE, amount: number): number
    {
        let overflow = this.totalOccupied() - this.numberOfVoters + amount;
        if(overflow > 0)
        {
            amount -= overflow;
        }

        let doesCandidateExist = false;
        this.listOccupied.forEach((candidateInfo) => {
            if(candidateInfo.getCandidate() === candidate)
            {
                doesCandidateExist = true;
                candidateInfo.setAmountOccupied(amount + candidateInfo.getAmountOccupied());
            }    
        })

        if(!doesCandidateExist)
        {
            let newCandidateInfo = new CandidateInfo(candidate);
            newCandidateInfo.setAmountOccupied(amount);
            this.listOccupied.push(newCandidateInfo);
        }
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
        for(let info of this.listOccupied)
        {
            sum += info.getAmountOccupied();
        }
        return sum;
    }


}

class CandidateInfo
{
    private candidate: CANDIDATE;
    private amountOccupied: number;

    constructor(candidate: CANDIDATE)
    {
        this.candidate = candidate;
        this.amountOccupied = 0;
    }

    public getCandidate(): CANDIDATE {return this.candidate;}
    public setAmountOccupied(value: number) {this.amountOccupied = value;}
    public getAmountOccupied(): number {return this.amountOccupied;}

    
}