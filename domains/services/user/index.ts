import axiosInstance from "@/configs/axios.config";
import { UserParams, UserPayload, UserProfile, UserResponse } from "@/domains/models/user";

export const userService = {
  get: {
    list: async (
      params: UserParams = {}
    ): Promise<RootResponse<Pagination<UserResponse>>> => {
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

    userProfile: async (id: string): Promise<RootResponse<UserProfile>> => {
      try {
        if (!id) {
          throw new Error("User ID is required for fetching profile");
        }
        const response = await axiosInstance.get(`/accounts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
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
    updateProfile: async (
      formData: Partial<UserProfile>
    ): Promise<RootResponse<UserProfile>> => {
      try {
        const response = await axiosInstance.put(
          "/accounts/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
