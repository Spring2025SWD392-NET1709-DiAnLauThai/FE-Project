import { AssignDesignerPayload, PaginatedTaskResponse, Task, TaskParams } from "@/domains/models/tasks";

import { QueryKey } from "@/domains/stores/query-key";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { taskServices } from "@/domains/services/assign-tasks";
import { useState } from "react";

export function useDesigners() {
  return useQuery({
    queryKey: [QueryKey.DESIGNER.LIST],
    queryFn: async () => await taskServices.get.listDesigner(),
    select: (data) => data.data,
  });
}

export const useTasksQuery = (
  initialParams: TaskParams = { page: 1, size: 10, designerName: "" }
) => {
  const [params, setParams] = useState<TaskParams>(initialParams);

  const tasksQuery = useQuery({
    queryKey: [QueryKey.TASK.LIST, params],
    queryFn: async () => await taskServices.get.list(params),
    initialData: {
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
      },
      message: "",
      code: 0,
    } as RootResponse<Pagination<PaginatedTaskResponse>>,
  });

  // Update filters function
  const updateFilters = (newParams: Partial<TaskParams>) => {
    setParams((prev: any) => ({
      ...prev,
      ...newParams,
      // Reset to page 1 when filters change (except when explicitly setting page)
      page: newParams.page !== undefined ? newParams.page : 1,
    }));
  };

  return { tasksQuery, params, updateFilters };
};

export const useAssignDesignerMutation = () => {
  const { toast } = useToast();
  const assignDesigner = useMutation({
    mutationKey: [QueryKey.TASK.ASSIGN_DESIGNER],
    mutationFn: async (payload: AssignDesignerPayload) =>
      await taskServices.post.assignDesigner(payload),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `${data.message}`,
      });
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
  return { assignDesigner };
};
