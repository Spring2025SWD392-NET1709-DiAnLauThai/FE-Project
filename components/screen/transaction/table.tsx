"use client";

import React from "react";
import SearchInput from "../../plugins/search-input";
import { useTransactionSystem } from "@/hooks/transaction/use-transaction";
import PaginationTable from "../../plugins/pagination";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../../plugins/table";
import { TransactionColumns } from "./columns";

const TransactionTable = () => {
  const { value } = useParamStore();
  const transactionQuery = useTransactionSystem({
    page: value.page ?? 1,
    size: value.size ?? 10,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="transactionId" />

        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              transactionQuery.data?.data ?? {
                content: [],
                totalElements: 0,
                totalPages: 0,
                pageSize: 0,
                pageNumber: 0,
              }
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

export default TransactionTable;
