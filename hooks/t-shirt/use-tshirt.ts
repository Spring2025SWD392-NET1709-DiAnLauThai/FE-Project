import { TShirtParams } from "@/domains/models/tshirt";
import { TShirtService } from "@/domains/services/t-shirt";
import { QueryKey } from "@/domains/stores/query-key";
import { useQuery } from "@tanstack/react-query";

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
