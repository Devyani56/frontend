const authServiceUrl = "http://localhost:3002/api/users";
const pollutionServiceUrl = "http://localhost:3002/api/pollution";

const baseUrl = "http://localhost:3000";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": baseUrl,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
  withCredentials: true,

};

export { authServiceUrl, pollutionServiceUrl, baseUrl, config };
