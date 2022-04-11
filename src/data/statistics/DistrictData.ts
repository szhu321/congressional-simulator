import DemographicsData from "./DemographicsData";

export enum StateEnum {
    NEW_YORK = "New York",
    FLORIDA = "Florida",
    NORTH_CAROLINA = "North Carolina",
}

export default class DistrictData
{
    private districtNumber: number;
    private state: StateEnum;
    private demographics: DemographicsData;

    constructor(districtNumber: number, state: StateEnum, demographics: DemographicsData)
    {
        this.districtNumber = districtNumber;
        this.state = state;
        this.demographics = demographics;
    }

    public getDistrictNumber(): number {return this.districtNumber;}
    public getState(): StateEnum {return this.state;}
    public getDemographics(): DemographicsData {return this.demographics;}
}