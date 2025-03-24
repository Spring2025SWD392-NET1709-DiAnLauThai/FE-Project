import { AuthServices } from "@/domains/services/auth.services";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // if (error.response?.status === 401) {
    //   originalRequest._retry = true;
    //   try {
    //     const refreshToken = localStorage.getItem("refreshToken");
    //     if (refreshToken) {
    //       const response = await AuthServices.refreshToken(refreshToken);
    //       localStorage.setItem("accessToken", response.data.accessToken);
    //       localStorage.setItem("refreshToken", response.data.refreshToken);
    //       originalRequest.headers[
    //         "Authorization"
    //       ] = `Bearer ${response.data.accessToken}`;
    //       return axiosInstance(originalRequest);
    //     }
    //   } catch (error) {
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     window.location.href = "/login";
    //     return Promise.reject(error);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
