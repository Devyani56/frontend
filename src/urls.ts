const authServiceUrl = "/api/users";
const pollutionServiceUrl = "/api/pollution";
const config = {
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}

export { authServiceUrl, pollutionServiceUrl, config };
