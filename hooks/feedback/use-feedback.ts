import { useToast } from "../use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";
import { FeedbackPayload } from "@/domains/models/feedback";
import { FeedbackService } from "@/domains/services/feedback";

export const useCreateFeedback = () => {
  const toast = useToast();
  const createFeedbackMutation = useMutation({
    mutationKey: [QueryKey.FEEDBACK.CREATE],
    mutationFn: async (payload: FeedbackPayload) =>
      await FeedbackService.post.uploadFeedback(payload),
    onSuccess: () => {
      toast.toast({
        title: "Save feedback success",
        description: "Save success",
      });
    },
    onError: (error) => {
      console.log("Create failed", error);
    },
  });

  return { createFeedbackMutation };
};

export const useGetFeedback = (id: string) => {
  return useQuery({
    queryKey: [QueryKey.FEEDBACK.LIST, id],
    queryFn: () => FeedbackService.get.getFeedbackById(id),
  });
};
