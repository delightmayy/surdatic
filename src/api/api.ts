import axios from "axios";

const api = axios.create({
  baseURL: "https://api.surdatics.com", // replace with your API base URL
});

// Add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
