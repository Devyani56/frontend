import axios from "axios";
import {authServiceUrl, config} from "../../urls";
interface SigninData {
    email: string;
    password: string;
}
const signinApi = async (data: SigninData) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/users/signin`, data,config);
        const responseData = {
            type: "success",
            data: response.data,
            status: response.status
        }

        // read the cookie and set it for all requests to localhost:3001
        const cookie = response.headers["set-cookie"];
        if (cookie) {
            // use domain localhost:3001
            document.cookie = `${cookie[0]};domain=localhost:3001;path=/`;
        }
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

export default signinApi;
