import axiosInstance from "@/configs/axios.config";
import { Dashboard, DashboardParams } from "../models/dashboard.model";

export const dashboardService = {
  get: async (params: DashboardParams): Promise<RootResponse<Dashboard>> => {
    const response = await axiosInstance.get("/dashboard-stat/general-stat", {
      params,
    });
    return response.data;
  },
};
