import { AssignDesignerPayload, PaginatedTaskResponse, Task, TaskConfirm, TaskParams } from "@/domains/models/tasks";

import { QueryKey } from "@/domains/stores/query-key";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { taskServices } from "@/domains/services/tasks";
import { useState } from "react";

export function useDesigners() {
  return useQuery({
    queryKey: [QueryKey.DESIGNER.LIST],
    queryFn: async () => await taskServices.get.listDesigner(),
    select: (data) => data.data,
  });
}

export function useTaskDetail(id: string) {
  const queryResult = useQuery({
    queryKey: [QueryKey.TASK.DETAIL, id],
    queryFn: async () => await taskServices.get.taskDetail(id),
    select: (data) => data.data,
    
  });

  return queryResult; 
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

  const isLoading = tasksQuery.isLoading || tasksQuery.isFetching;

  return { tasksQuery, params, updateFilters, isLoading };
};

export const useTasksDesignerQuery = (
  initialParams: TaskParams = { page: 1, size: 10, designerName: "" }
) => {
  const [params, setParams] = useState<TaskParams>(initialParams);

  const tasksQuery = useQuery({
    queryKey: [QueryKey.TASK.LIST, params],
    queryFn: async () => await taskServices.get.listTaskDesigner(params),
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

  const isLoading = tasksQuery.isLoading || tasksQuery.isFetching;

  return { tasksQuery, params, updateFilters, isLoading };
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

export const useConfirmTaskMutation = () => {
  const { toast } = useToast();
  const confirmTask = useMutation({
    mutationKey: [QueryKey.TASK.CONFIRM_TASK],
    mutationFn: async (bookingId: string) =>
      await taskServices.put.confirmTask(bookingId),
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
  return { confirmTask };
};
