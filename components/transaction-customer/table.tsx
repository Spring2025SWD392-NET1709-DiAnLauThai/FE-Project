"use client";

import React from "react";
import SearchInput from "../plugins/search-input";
import PaginationTable from "../plugins/pagination";
import { TransactionColumns } from "./columns";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../plugins/table";
import { TransactionResponse } from "@/domains/models/transaction";
import { useTransactionCustomer } from "@/hooks/transaction/use-transaction";

const TransactionCustomerTable = () => {
  const { value } = useParamStore();

  const transactionQuery = useTransactionCustomer({
    page: value.page ?? 1,
    size: value.size ?? 10,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="transactionName" />

        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              transactionQuery.data?.data ??
              ({
                content: [],
                totalElements: 0,
                totalPages: 0,
                pageSize: 0,
                pageNumber: 0,
              } as Pagination<TransactionResponse>)
            }
          />
        </div>
      </div>

      <DataTable
        columns={TransactionColumns}
        data={transactionQuery.data?.data?.content ?? []}
      />
    </div>
  );
};

export default TransactionCustomerTable;
