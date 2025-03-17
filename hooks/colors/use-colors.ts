import { ColorPayload } from "@/domains/models/color";
import { useToast } from "../use-toast";
import { ColorService } from "@/domains/services/colors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/domains/stores/query-key";

export const useCreateColor = () => {
  const toast = useToast();
  const createColorMutation = useMutation({
    mutationKey: [QueryKey.COLOR.CREATE],
    mutationFn: async (payload: ColorPayload) =>
      await ColorService.post.addColor(payload),
    onSuccess: () => {
      toast.toast({
        title: "Save color success",
        description: "Save success",
      });
    },
    onError: (error) => {
      console.log("Create failed", error);
    },
  });

  return { createColorMutation };
};

export const useGetColor = () => {
  return useQuery({
    queryKey: [QueryKey.COLOR.GET],
    queryFn: () => ColorService.get.getSavedColor(),
  });
};
