import axiosInstance from "@/configs/axios.config";
import { TShirtParams, TShirtResponse } from "@/domains/models/tshirt";

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
  },
  post: {},
  put: {},
  delete: {},
};
