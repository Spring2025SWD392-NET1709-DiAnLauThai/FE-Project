import axiosInstance from "@/configs/axios.config";
import {
  AssignTshirt,
  TShirtParams,
  TShirtPayload,
  TShirtPublicResponse,
  TShirtResponse,
} from "@/domains/models/tshirt";

export const TShirtService = {
  get: {
    list: async (
      params: TShirtParams
    ): Promise<RootResponse<Pagination<TShirtResponse>>> => {
      try {
        const response = await axiosInstance.get("/tshirts", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    publicTshirt: async (
      params: TShirtParams
    ): Promise<RootResponse<Pagination<TShirtPublicResponse>>> => {
      try {
        const response = await axiosInstance.get("/tshirts/public", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    availableList: async (): Promise<
      RootResponse<Pagination<TShirtResponse>>
    > => {
      try {
        const response = await axiosInstance.get("/tshirts/available");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    detail: async (id: string): Promise<RootResponse<TShirtResponse>> => {
      try {
        const response = await axiosInstance.get(`/tshirts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  post: {
    create: async (
      data: TShirtPayload
    ): Promise<RootResponse<TShirtResponse>> => {
      try {
        const response = await axiosInstance.post("/tshirts/create", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    update: async (
      id: string,
      data: TShirtPayload
    ): Promise<RootResponse<TShirtResponse>> => {
      try {
        const response = await axiosInstance.put(`/tshirts/${id}`, data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    assignTshirt: async (
      data: AssignTshirt
    ): Promise<RootResponse<TShirtResponse>> => {
      try {
        const response = await axiosInstance.put("/task/select/tshirt", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {
    delete: async (id: string): Promise<RootResponse<TShirtResponse>> => {
      try {
        const response = await axiosInstance.delete(`/tshirts/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
