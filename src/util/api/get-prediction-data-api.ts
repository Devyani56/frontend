import axios from 'axios';
import {pollutionServiceUrl, config} from "../../urls";
// To-Do addd extra dropdown menu called metric. to get prediction data based on metric
export const getPredictionDataApi = async (sourceId : string ,modelName: string, startDate: Date, endDate: Date ) => {
    try {
        // add filter tag to url
        const response = await axios.post(pollutionServiceUrl + `/prediction/${sourceId}`, {"modelName": modelName, startDate:startDate, endDate: endDate},config)
        const responseData = {
            type: "success",
            data: response.data.data,
            status: response.status
        }
        console.log(response.data.data);
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
