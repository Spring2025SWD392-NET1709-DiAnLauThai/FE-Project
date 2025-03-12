import axiosInstance from "@/configs/axios.config";
import { TransactionParams } from "@/domains/models/transaction";

export const TransactionService = {
  get: {
    list: async (params: TransactionParams) => {
      const response = await axiosInstance.get("/transcations", { params });
      return response.data;
    },

    listSystem: async (params: TransactionParams) => {
      const response = await axiosInstance.get("/transcations/system", {
        params,
      });
      return response.data;
    },

    detail: async (id: string) => {
      const response = await axiosInstance.get(`/transcations/${id}`);
      return response.data;
    },
  },
};
