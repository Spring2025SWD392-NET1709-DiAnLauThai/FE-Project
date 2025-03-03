import axiosInstance from "@/configs/axios.config";
import { UserParams, UserPayload, UserResponse } from "@/domains/models/user";

export const userService = {
  get: {
    list: async (
      params: UserParams = {}
    ): Promise<RootResponse<Pagination<UserParams>>> => {
      try {
        // Make sure params is properly structured with defaults if needed
        const defaultParams: UserParams = {
          page: 1,
          size: 10,
          sortDir: "asc",
          sortBy: "createdAt",
          ...params,
        };

        const response = await axiosInstance.get("/accounts", {
          params: defaultParams,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    detail: async (id: string): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.get(`/accounts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  // createAccount: async (data: UserPayload) => {
  //     const response = await axiosInstance.post("/accounts", data);
  //     return response.data;
  //   },
  // updateAccount: async (id: string, data: UserPayload) => {
  //   console.log("API call - Update Account:", id, data); // Debug log
  //   const response = await axiosInstance.put(`/accounts/${id}`, data);
  //   return response.data;
  // },
  post: {
    account: async (data: UserPayload): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.post("/accounts", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    account: async (
      id: string,
      data: UserPayload
    ): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.put(`/accounts/${id}`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {
    account: async (id: string): Promise<RootResponse<UserResponse>> => {
      try {
        const response = await axiosInstance.delete(`/accounts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  patch: {},
};
