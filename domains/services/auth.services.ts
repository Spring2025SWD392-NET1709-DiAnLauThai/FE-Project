import axiosInstance from "@/configs/axios.config";
import {
  GoogleAuthCallbackPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./../models/auth.model";
import { UserResponse } from "../models/user";
export const AuthServices = {
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

  register: async (payload: RegisterPayload): Promise<RootResponse<null>> => {
    try {
      const response = await axiosInstance.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  googleLogin: async (): Promise<RootResponse<string>> => {
    try {
      const response = await axiosInstance.get("/auth/google/login");
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  googleCallback: async (code: string): Promise<RootResponse<GoogleAuthCallbackPayload>> => { 
    try {
      const response = await axiosInstance.get(`/auth/google/callback?code=${code}`);
      return response.data;
    } catch (error) {
      throw error;
    }

  }
};
