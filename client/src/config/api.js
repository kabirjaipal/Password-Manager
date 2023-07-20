import axios from "axios";

export const baseUrl = "http://localhost:3000";

const apiInstance = axios.create({
  baseURL: baseUrl,
});

apiInstance.interceptors.request.use(async function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
