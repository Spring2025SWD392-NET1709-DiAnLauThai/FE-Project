import axiosInstance from "@/configs/axios.config";
import { UserParams, UserResponse } from "@/domains/models/user";

export const userService = {
  get: {
    list: async (
      params?: UserParams
    ): Promise<RootResponse<Pagination<UserResponse>>> => {
      try {
        const response = await axiosInstance.get("/accounts", { params });

        return response.data;
      } catch (error) {
        throw error;
      }
    },

    detail: async (id: string): Promise<UserResponse> => {
      try {
        const response = await axiosInstance.get(`/accounts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },

  create: {},
  update: {},
  delete: {},
  patch: {},
};
