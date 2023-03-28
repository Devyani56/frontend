// const authServiceUrl = "https://airlifegoa.dev/api/users";
const authServiceUrl = "http://localhost:3002/api/users";
// const pollutionServiceUrl = "https://airlifegoa.dev/api/pollution";
const pollutionServiceUrl = "http://localhost:3001/api/pollution";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export { authServiceUrl, pollutionServiceUrl, config };
