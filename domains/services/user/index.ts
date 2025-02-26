import axiosInstance from "@/configs/axios.config";
import {
  PaginationParams,
  UserParams,
  UserResponse,
  ApiResponse,
  UserPayload,
} from "@/domains/models/user";

export const userService = {
  get: {
    list: async (params?: UserParams): Promise<UserResponse[]> => {
      const response = await axiosInstance
        .get("/users", { params })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err);
        });

      return response;
    },
  },
  getAllAccount: async (params?: PaginationParams): Promise<ApiResponse> => {
    const response = await axiosInstance.get("/accounts", {
      params: {
        page: params?.page ?? 1,
        size: params?.size ?? 10,
      },
    });
    return response.data;
  },
  createAccount: async (data: UserPayload) => {
      const response = await axiosInstance.post("/accounts", data);
      return response.data;
    },
  updateAccount: async (id: string, data: UserPayload) => {
    console.log("API call - Update Account:", id, data); // Debug log
    const response = await axiosInstance.put(`/accounts/${id}`, data);
    return response.data;
  },
  update: {},
  delete: {},
  patch: {},
};
