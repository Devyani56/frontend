const authServiceUrl = "http://localhost:3002/api/users";
const pollutionServiceUrl = "http://localhost:3002/api/pollution";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export { authServiceUrl, pollutionServiceUrl, config };
