const authServiceUrl = "https://airlifegoa.dev/api/users";
const pollutionServiceUrl = "https://airlifegoa.dev/api/pollution";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export { authServiceUrl, pollutionServiceUrl, config };
