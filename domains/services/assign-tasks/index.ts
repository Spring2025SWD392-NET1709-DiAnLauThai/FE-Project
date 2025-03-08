import axiosInstance from '@/configs/axios.config';
import {
  AssignDesignerPayload,
  DesignersResponse,
} from "./../../models/tasks/index";


export const taskServices = {
  post: {
    assignDesigner: async (
      payload: AssignDesignerPayload
    ): Promise<RootResponse<null>> => {
      try {
        const response = await axiosInstance.post("task/assign", payload);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  get: {
    listDesigner: async (): Promise<RootResponse<DesignersResponse>> => {
      try {
        const response = await axiosInstance.get(
          "/accounts?page=1&size=100&role=DESIGNER&sortDir=asc&sortBy=createdAt"
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {},
  delete: {},
};
