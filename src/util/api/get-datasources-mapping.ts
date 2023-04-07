import axios from "axios";
import {pollutionServiceUrl, config} from "../../urls";


export const getDataSourceMappingAPi = async () => {
   try {
       const response = await axios.get(`${pollutionServiceUrl}/datasourcemapping`, config);

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
