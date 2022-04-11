
export default class DemographicsData
{
    private totalPopulation: number;
    private democraticVoters: number;
    private republicanVoters: number;

    constructor(totalPopulation: number, democraticVoters: number, republicanVoters: number)
    {
        this.totalPopulation = totalPopulation;
        this.democraticVoters = democraticVoters;
        this.republicanVoters = republicanVoters;
    }

    public getTotalPopulation(): number {return this.totalPopulation;}
    public getDemocraticVoters(): number {return this.democraticVoters;}
    public getRepublicanVoters(): number {return this.republicanVoters;}


}