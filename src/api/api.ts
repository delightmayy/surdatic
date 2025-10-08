import axios from "axios";

const api = axios.create({
  baseURL: "https://api.surdatics.com",
});

// Request interceptor → add token if available
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

// Response interceptor → handle expired token (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      // Only redirect if user is inside dashboard routes
      if (currentPath.startsWith("/dashboard")) {
        localStorage.removeItem("token");
        if (currentPath !== "/login") {
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
