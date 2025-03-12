import { TransactionParams } from "@/domains/models/transaction";
import { TransactionService } from "@/domains/services/transaction";
import { QueryKey } from "@/domains/stores/query-key";
import { useQuery } from "@tanstack/react-query";

export const useTransactionSystem = (params: TransactionParams) => {
  const listSystemQuery = useQuery({
    queryKey: [QueryKey.TRANSACTION.SYSTEM, params],
    queryFn: () => TransactionService.get.listSystem(params),
    enabled: !!params.page,
    retry: 2,
  });

  return listSystemQuery;
};

export const useTransactionDetail = (id: string) => {
  const detailQuery = useQuery({
    queryKey: [QueryKey.TRANSACTION.DETAIL, id],
    queryFn: () => TransactionService.get.detail(id),
    enabled: !!id,
    retry: 2,
  });

  return detailQuery;
};

export const useTransactionCustomer = (params: TransactionParams) => {
  const listCustomerQuery = useQuery({
    queryKey: [QueryKey.TRANSACTION.LIST, params],
    queryFn: () => TransactionService.get.list(params),
    retry: 2,
  });

  return listCustomerQuery;
};