import axios from "axios";
import {pollutionServiceUrl, authServiceUrl, config} from "../../urls";


export const getAllUserDataAPi = async () => {
    try {
        const response = await axios.get(`${authServiceUrl}/all-users`, config);

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
