import {pollutionServiceUrl} from "../../urls";
import axios from "axios";

const createDataSourceApi = async (data : any) => {
    try {
        const response = await axios.post(`${pollutionServiceUrl}/datasource/create`, data);
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

export {createDataSourceApi};
