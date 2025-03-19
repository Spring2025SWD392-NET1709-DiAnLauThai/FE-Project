import axiosInstance from "@/configs/axios.config";
import { TransactionDetailResponse, TransactionParams, TransactionResponse } from "@/domains/models/transaction";

export const TransactionService = {
  get: {
    list: async (params: TransactionParams): Promise<RootResponse<TransactionResponse>> => {
      try {
        const response = await axiosInstance.get("/transactions/customer", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    listSystem: async (params: TransactionParams): Promise<RootResponse<TransactionResponse>> => {
      try {
        const response = await axiosInstance.get("/transactions/system", {
          params,
        });
        return response.data;
        
      } catch (error) {
        throw error;
      }
    },

    detail: async (id: string): Promise<RootResponse<TransactionDetailResponse>> => {
      
      try {
        const response = await axiosInstance.get(`/transactions/detail/${id}`);
        return response.data;
        
      } catch (error) {
        throw error;
      }
    },
  },
};
