import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { dashboardService } from "@/domains/services/dashboard.service";
import { DashboardParams } from "@/domains/models/dashboard.model";

export const useDashboard = (params: DashboardParams) => {
  const dashboardQuery = useQuery({
    queryKey: [QueryKey.DASHBOARD, params],
    queryFn: () => dashboardService.get(params),
  });

  return dashboardQuery;
};
