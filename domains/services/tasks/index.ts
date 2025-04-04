import axiosInstance from '@/configs/axios.config';
import {
  AssignDesignerPayload,
  DesignersResponse,
  PaginatedTaskResponse,
  TaskConfirm,
  TaskDetail,
  TaskParams,
} from "../../models/tasks/index";


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
    list: async (
      params: TaskParams
    ): Promise<RootResponse<Pagination<PaginatedTaskResponse>>> => {
      try {
        const defaultParams: TaskParams = {
          ...params,
          page: 1,
          size: 10,
          sortDir: "asc",
        };
        const response = await axiosInstance.get("/task", {
          params: defaultParams,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    listTaskDesigner: async (
      params: TaskParams
    ): Promise<RootResponse<Pagination<PaginatedTaskResponse>>> => {
      try {
        const defaultParams: TaskParams = {
          ...params,
          page: 1,
          size: 10,
          sortDir: "asc",
        };
        const response = await axiosInstance.get("/task/designer", {
          params: defaultParams,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
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
    taskDetail: async (id: string): Promise<RootResponse<TaskDetail>> => {
      try {
        const response = await axiosInstance.get(`/task/detail/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  put: {
    confirmTask: async (
      bookingId: string
    ): Promise<RootResponse<string>> => {
      try {
        const response = await axiosInstance.put(`/task/confirm/${bookingId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  },
  delete: {},
};
