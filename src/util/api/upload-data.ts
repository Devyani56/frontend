import { pollutionServiceUrl } from "../../urls";
import axios from "axios";

const uploadDataSourceApi = async (data: any) => {
    console.log("data", data);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/pollution/data",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = {
      type: "success",
      data: response.data,
      status: response.status,
    };
    return responseData;
  } catch (e: any) {
    console.log("error");
    const responseData = {
      type: "error",
      data: e.response.data.errors,
      status: e.response.status,
    };
    return responseData;
  }
};

export { uploadDataSourceApi };
