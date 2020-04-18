import axios from "axios";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  //baseURL: "http://game.bengo.io:8000/",
  baseURL: "http://127.0.0.1:8000/",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default axiosInstance;
