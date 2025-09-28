import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api";

// Create a single axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear expired token
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Export functions using the axios instance
export const registerUser = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
