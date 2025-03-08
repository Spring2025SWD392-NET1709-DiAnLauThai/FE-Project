import { AssignDesignerPayload } from "@/domains/models/tasks";

import { QueryKey } from "@/domains/stores/query-key";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { taskServices } from "@/domains/services/assign-tasks";

export function useDesigners() {
  return useQuery({
    queryKey: [QueryKey.DESIGNER.LIST],
    queryFn: async () => await taskServices.get.listDesigner(),
    select: (data) => data.data,
  });
}

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
