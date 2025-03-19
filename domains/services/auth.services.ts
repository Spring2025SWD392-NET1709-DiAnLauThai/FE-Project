import axiosInstance from "@/configs/axios.config";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./../models/auth.model";
export const AuthServices = {
  loginWithGoogle: async (): Promise<RootResponse<string>> => {
    try {
      const response = await axiosInstance.get("/auth/google/login");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (
    payload: LoginPayload
  ): Promise<RootResponse<LoginResponse>> => {
    try {
      const response = await axiosInstance.post("/auth/signin", payload);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    payload: RegisterPayload
  ): Promise<RootResponse<{ valid: boolean }>> => {
    try {
      const response = await axiosInstance.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  validate: async (): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post("/auth/validate");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error;
    }
  },

  refreshToken: async (
    refreshToken: string
  ): Promise<RootResponse<LoginResponse>> => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
