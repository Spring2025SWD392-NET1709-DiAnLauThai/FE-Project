"use client";

import React from "react";
import SearchInput from "../plugins/search-input";
import { useBookingsQuery } from "@/hooks/booking/use-booking";
import PaginationTable from "../plugins/pagination";
import { BookingResponse } from "@/domains/models/booking";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../plugins/table";
import { BookingDashboardColumn } from "./column";

const BookingDashboardTable = () => {
  const { value } = useParamStore();

  const { bookingQuery } = useBookingsQuery({
    params: {
      page: value.page ?? 1,
      size: value.size ?? 10,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <SearchInput keyValue="manufacture" />

        <div className="flex items-center space-x-4">
          <PaginationTable
            value={
              bookingQuery.data?.data ??
              ({
                content: [],
                totalElements: 0,
                totalPages: 0,
                pageSize: 0,
                pageNumber: 0,
              } as Pagination<BookingResponse>)
            }
          />
        </div>
      </div>

      <DataTable
        columns={BookingDashboardColumn}
        data={bookingQuery.data?.data?.content ?? []}
      />
    </div>
  );
};

export default BookingDashboardTable;
