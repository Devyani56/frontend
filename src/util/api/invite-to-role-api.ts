import axios from 'axios';
import {authServiceUrl} from "../../urls";

export const inviteToRoleApi = async (userId : string, role: string, email: string) => {
    try {
        const response = await axios.post( authServiceUrl+ `/invite-to-role/${userId}`, {role, email});
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
