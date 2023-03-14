import axios from 'axios';
import {pollutionServiceUrl} from "../../urls";
// To-Do addd extra dropdown menu called metric. to get prediction data based on metric
export const getPredictionDataApi = async (sourceId : string,modelName: string, startDate  = 1, endDate = 1000 ) => {
    try {
        // add filter tag to url
        const response = await axios.post(pollutionServiceUrl + `/data/${sourceId}`, {"modelName": modelName})
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log(response.data);
        return responseData;
    }
    catch (e : any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
