export interface IDataSourceData {
    creator : string;
    name : string;
    location : {
        lat : number;
        lng : number;
        address : string;
    }
    type : "sensor" | "manual";
    description : string;
    metrics : {
        "PM10" : boolean;
        "PM2.5" : boolean;
        "NO2" : boolean;
        "CO" : boolean;
        "SO2" : boolean;
        "O3" : boolean;
        "NH3" : boolean;
        "AQI" : boolean;
    }
    expectedFrequencySeconds : number;
    expectedFrequencyType : "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";

    admins : string[];
    secondsSinceLastUpdate : number;
    id: string;
}

