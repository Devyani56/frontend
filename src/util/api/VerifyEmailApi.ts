import {authServiceUrl} from "../../urls";
import axios from "axios";

export const verifyEmailApi = async (token : string) => {
    try {
        const response = await axios.post(`${authServiceUrl}/verify-email/${token}`);
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