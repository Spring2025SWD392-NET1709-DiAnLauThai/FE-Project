import axiosInstance from "@/configs/axios.config";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "./../models/auth.model";
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
};
