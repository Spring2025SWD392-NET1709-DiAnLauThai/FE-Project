"use client";

import React from "react";
import SearchInput from "../../plugins/search-input";
import { useTShirtsQuery } from "@/hooks/t-shirt/use-tshirt";
import PaginationTable from "../../plugins/pagination";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../../plugins/table";
import { TShirtColumns } from "./columns";

const TShirtTable = () => {
  const { value } = useParamStore();
  const { queryTShirts } = useTShirtsQuery({
    params: {
      page: value.page ?? 1,
      size: value.size ?? 10,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="name" />

        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              queryTShirts.data?.data ?? {
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
        columns={TShirtColumns}
        data={queryTShirts.data?.data?.content ?? []}
      />
    </div>
  );
};

export default TShirtTable;
