import axios from "axios";

export const Url = "https://task-backend-olive.vercel.app";
// export const Url = "http://localhost:3333";

const api = axios.create({
  baseURL: Url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
