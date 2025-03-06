"use client";

import React from "react";
import SearchInput from "../plugins/search-input";
import { useBookingsQuery } from "@/hooks/booking/use-booking";
import PaginationTable from "../plugins/pagination";
import { BookingResponse } from "@/domains/models/booking";
import { DataTable } from "../table/Table";
import { BookingColumn } from "./columns";
import { useParamStore } from "@/domains/stores/params-store";

const BookingTable = () => {
  const { value } = useParamStore();
  const { bookingQuery } = useBookingsQuery({
    params: {
      page: value.page,
      size: value.size,
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
        columns={BookingColumn}
        data={bookingQuery.data?.data?.content ?? []}
      />
    </div>
  );
};

export default BookingTable;
