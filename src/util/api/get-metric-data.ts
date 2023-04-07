import axios from 'axios';
import {pollutionServiceUrl, config} from "../../urls";

export const getMetricDataApi = async (sourceId : string, metric: string ) => {
    try {
        // add filter tag to url
        const response = await axios.get(pollutionServiceUrl + `/metricdata/${sourceId}?metric=${metric}`, config)
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
