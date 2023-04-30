import axios from 'axios';
import {authServiceUrl, config } from "../../urls";

export const roleChangeMail = async (userId : string, role: string, ) => {
    try {
        const response = await axios.post( authServiceUrl+ `/mail-change-roles`, {"userId": userId, "newRole":role }, config);
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
