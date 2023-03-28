import axios from "axios";
import {pollutionServiceUrl} from "../../urls";


export const getAllDataSourceAPi = async () => {
    try {
        const response = await axios.get(`${pollutionServiceUrl}/datasource`);

        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }
        console.log("In response block :",responseData);
        return responseData;
    }
    catch (err : any) {
        const responseData = {
            type: "error",
            data: err.response.data.errors,
            status: err.response.status
        }
        console.log("In error block :",responseData);
        return responseData;
    }
}
