"use client";

import React from "react";
import SearchInput from "../../plugins/search-input";
import { useTShirtsQuery } from "@/hooks/t-shirt/use-tshirt";
import PaginationTable from "../../plugins/pagination";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../../plugins/table";
import { TShirtColumns } from "./columns";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";

const TShirtTable = () => {
  const { value } = useParamStore();
  const { queryTShirts, isLoading } = useTShirtsQuery({
    params: {
      page: value.page ?? 1,
      size: value.size ?? 10,
    },
  });

  const hasData =
    queryTShirts.data?.data?.content &&
    queryTShirts.data?.data?.content.length > 0;
  
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

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <LoadingDots size="lg" color="primary" />
        </div>
      ) : hasData ? (
        <DataTable
          columns={TShirtColumns}
          data={queryTShirts.data?.data?.content ?? []}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <div className="text-xl font-semibold text-muted-foreground mb-2">
            No T-shirt Found
          </div>
          <p className="text-muted-foreground">
            There are no T-shirt matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default TShirtTable;
