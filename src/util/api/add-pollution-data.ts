import {pollutionServiceUrl, config} from "../../urls";
import axios from "axios";

const addPollutionDataApi = async (data : any) => {
    try {
        console.log("ewasxrxfchgvytftrcgfcjhcjhyfyd",data);
        const response = await axios.post(`${pollutionServiceUrl}/data`, data, config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        return responseData;
    }
    catch (e : any) {
        const responseData = {
            type: "error",
            data: e.response.data.errors,
            status: e.response.status
        }
        return responseData;
    }
}

export {addPollutionDataApi};
