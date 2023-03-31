import axios from 'axios';
import {pollutionServiceUrl, config} from "../../urls";

export const getNumRowsForASourceApi = async (sourceId : string) => {
    try {
        const response = await axios.get(pollutionServiceUrl + `/data/num-rows/${sourceId}`, config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log(responseData);
        return responseData;
    }
    catch (e: any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        console.log(e);
        return responseData;
    }
}
