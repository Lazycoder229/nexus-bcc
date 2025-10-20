import axios from "axios";

const api = axios.create({
  baseURL: import.meta.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
