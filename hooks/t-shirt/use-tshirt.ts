import { AssignTshirt, TShirtParams, TShirtPayload, TShirtUpdatePayload } from "@/domains/models/tshirt";
import { TShirtService } from "@/domains/services/t-shirt";
import { QueryKey } from "@/domains/stores/query-key";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "../use-toast";

interface TShirtQuery {
  params: TShirtParams;
}

export const useGetTshirtDetail = (id: string) => {
  const queryDetailTShirts = useQuery({
    queryKey: [QueryKey.TSHIRT.DETAIL, id],
    queryFn: () => TShirtService.get.detail(id),
  });

  const isLoadingDetail =
    queryDetailTShirts.isLoading || queryDetailTShirts.isFetching;

  return { queryDetailTShirts, isLoadingDetail };
};


export const useTShirtsQuery = ({ params }: TShirtQuery) => {
  const queryTShirts = useQuery({
    queryKey: [QueryKey.TSHIRT.LIST, params ? params : {}],
    queryFn: () => TShirtService.get.list(params),
  });

  const isLoading = queryTShirts.isLoading || queryTShirts.isFetching;

  return { queryTShirts, isLoading };
};

export const usePublicTShirtsQuery = ({ params }: TShirtQuery) => {
  const queryPublicTShirts = useQuery({
    queryKey: [QueryKey.TSHIRT.PUBLIC_LIST, params ? params : {}],
    queryFn: () => TShirtService.get.publicTshirt(params),
  });

  const isLoading =
    queryPublicTShirts.isLoading || queryPublicTShirts.isFetching;

  return { queryPublicTShirts, isLoading };
};

export const useAvailableTShirtsQuery = () => {
  const queryAvailableTShirts = useQuery({
    queryKey: [QueryKey.TSHIRT.AVAILABLE],
    queryFn: () => TShirtService.get.availableList(),

  });

  const isLoadingAvaible =
    queryAvailableTShirts.isLoading || queryAvailableTShirts.isFetching;
  const refetchAvailableTShirts = () => {
    return queryAvailableTShirts.refetch();
  };
  return { queryAvailableTShirts, isLoadingAvaible, refetchAvailableTShirts };
};


export const useTShirtDetailQuery = ({ id }: { id: string }) => {
  const queryTShirtDetail = useQuery({
    queryKey: [QueryKey.TSHIRT.DETAIL, id],
    queryFn: () => TShirtService.get.detail(id),
  });

  return queryTShirtDetail;
};


export const useAssignTshirtMutation = () => {
  const assignTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.ASSIGN_TSHIRT],
    mutationFn: (data: AssignTshirt) => TShirtService.put.assignTshirt(data),
    onSuccess: (data) => {
      const message = data.message || "Assign T-Shirt success";

      toast({
        title: "Assign T-Shirt",
        description: message,
      });
    },
    onError: (error: any) => {
      console.error("T-shirt assign failed:", error);

      const errorMessage =
        error.response?.data?.message || "There was a problem assign T-Shirt";

      toast({
        title: "Assign Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
  return { assignTshirt };
};


export const useTshirtMutation = () => {
  const createTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.CREATE],
    mutationFn: (data: TShirtPayload) => TShirtService.post.create(data),
    onSuccess: (data) => {
      const message =
        data.message || "Add T-Shirt success";

      toast({
        title: "Create T-Shirt",
        description: message,
      });
    },
    onError: (error: any) => {
      console.error("T-shirt add failed:", error);

      const errorMessage =
        error.response?.data?.message ||
        "There was a problem create T-Shirt";

      toast({
        title: "Create Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const updateTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.UPDATE],
    mutationFn: (data: TShirtUpdatePayload) => TShirtService.put.update(data),
    onSuccess: (data) => {
      const message = data.message || "Update T-Shirt success";

      toast({
        title: "Update T-Shirt",
        description: message,
      });
    },
    onError: (error: any) => {
      console.error("T-shirt Update failed:", error);

      const errorMessage =
        error.response?.data?.message || "There was a problem Update T-Shirt";

      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  return { createTshirt, updateTshirt };
};
