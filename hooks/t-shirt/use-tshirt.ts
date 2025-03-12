import { TShirtParams, TShirtPayload } from "@/domains/models/tshirt";
import { TShirtService } from "@/domains/services/t-shirt";
import { QueryKey } from "@/domains/stores/query-key";
import { useMutation, useQuery } from "@tanstack/react-query";

interface TShirtQuery {
  params: TShirtParams;
}

export const useTShirtsQuery = ({ params }: TShirtQuery) => {
  const queryTShirts = useQuery({
    queryKey: [QueryKey.TSHIRT.LIST, params ? params : {}],
    queryFn: () => TShirtService.get.list(params),
  });

  return { queryTShirts };
};

export const useTShirtDetailQuery = ({ id }: { id: string }) => {
  const queryTShirtDetail = useQuery({
    queryKey: [QueryKey.TSHIRT.DETAIL, id],
    queryFn: () => TShirtService.get.detail(id),
  });

  return queryTShirtDetail;
};

export const useTshirtMutation = () => {
  const createTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.CREATE],
    mutationFn: (data: TShirtPayload) => TShirtService.post.create(data),
  });

  const updateTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.UPDATE],
    mutationFn: ({ id, data }: { id: string; data: TShirtPayload }) =>
      TShirtService.put.update(id, data),
  });

  const deleteTshirt = useMutation({
    mutationKey: [QueryKey.TSHIRT.DELETE],
    mutationFn: (id: string) => TShirtService.delete.delete(id),
  });

  return { createTshirt, updateTshirt, deleteTshirt };
};
