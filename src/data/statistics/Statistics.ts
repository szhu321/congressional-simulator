import DemographicsData from "./DemographicsData";
import DistrictData, { StateEnum } from "./DistrictData";

//Singleton used to get district statistics.
export default class Statistics
{
    private static singleton: Statistics;
    private districtDatas: DistrictData[];

    constructor()
    {
        this.districtDatas = new Array<DistrictData>();
        this.populateDistricts();
    }

    public static getInstance(): Statistics
    {
        if(!Statistics.singleton)
            Statistics.singleton = new Statistics();
        return Statistics.singleton;
    }

    public getDistrictDatas(): DistrictData[] {return this.districtDatas;}

    private populateDistricts()
    {
        let data = this.getData();
        for(let districtData of data)
        {
            let demographics = new DemographicsData(districtData.demographics.totalPopulation, 
                districtData.demographics.democraticVoters, districtData.demographics.republicanVoters);
            let district = new DistrictData(districtData.districtNumber,
                districtData.state, demographics);
            this.districtDatas.push(district);
        }
    }

    private getData(): {districtNumber: number, state: StateEnum, demographics: {totalPopulation: number, democraticVoters: number, republicanVoters: number}}[]
    {
        let newYorkDistrictPopulation = 748732;
        let data = [
            //district data.
            {
                districtNumber: 1,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 149724,
                    republicanVoters: 175775,
                }
            },
            {
                districtNumber: 2,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 114737,
                    republicanVoters: 158130,
                }
            },
            {
                districtNumber: 3,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 195927,
                    republicanVoters: 147437,
                }
            },
            {
                districtNumber: 4,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 199762,
                    republicanVoters: 139559,
                }
            },
            {
                districtNumber: 5,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 229125,
                    republicanVoters: 120000, //no data
                }
            },
            {
                districtNumber: 6,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 144149,
                    republicanVoters: 67735,
                }
            },
            {
                districtNumber: 7,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 156889,
                    republicanVoters: 29404,
                }
            },
            {
                districtNumber: 8,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 207111,
                    republicanVoters: 39124,
                }
            },
            {
                districtNumber: 9,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 195758,
                    republicanVoters: 40110,
                }
            },
            {
                districtNumber: 10,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 181215,
                    republicanVoters: 61045,
                }
            },
            {
                districtNumber: 11,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 134625,
                    republicanVoters: 143420,
                }
            },
            {
                districtNumber: 12,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 265172,
                    republicanVoters: 49157,
                }
            },
            {
                districtNumber: 13,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 202916,
                    republicanVoters: 19829,
                }
            },
            {
                districtNumber: 14,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 152661,
                    republicanVoters: 52477,
                }
            },
            {
                districtNumber: 15,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 169533,
                    republicanVoters: 18984,
                }
            },
            {
                districtNumber: 16,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 218471,
                    republicanVoters: 120000, //no data
                }
            },
            {
                districtNumber: 17,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 183975,
                    republicanVoters: 117307,
                }
            },
            {
                districtNumber: 18,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 170899,
                    republicanVoters: 128568,
                }
            },
            {
                districtNumber: 19,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 168281,
                    republicanVoters: 151475,
                }
            },
            {
                districtNumber: 20,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 194071,
                    republicanVoters: 120839,
                }
            },
            {
                districtNumber: 21,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 122419,
                    republicanVoters: 169679,
                }
            },
            {
                districtNumber: 22,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 138898,
                    republicanVoters: 143291,
                }
            },
            {
                districtNumber: 23,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 116062,
                    republicanVoters: 161830,
                }
            },
            {
                districtNumber: 24,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 147638,
                    republicanVoters: 156025,
                }
            },
            {
                districtNumber: 25,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 187503,
                    republicanVoters: 115940,
                }
            },
            {
                districtNumber: 26,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 202315,
                    republicanVoters: 91687,
                }
            },
            {
                districtNumber: 27,
                state: StateEnum.NEW_YORK,
                demographics: {
                    totalPopulation: newYorkDistrictPopulation,
                    democraticVoters: 136783,
                    republicanVoters: 192756,
                }
            },
        ];

        return data;

    }
}

