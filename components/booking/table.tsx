"use client";

import React from "react";
import SearchInput from "../plugins/search-input";
import { useBookingsQuery } from "@/hooks/booking/use-booking";
import PaginationTable from "../plugins/pagination";
import { BookingResponse } from "@/domains/models/booking";
import { BookingColumn } from "./columns";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../plugins/table";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";

const BookingTable = () => {
  const { value } = useParamStore();
  const { bookingQuery, isLoading } = useBookingsQuery({
    params: {
      page: value.page ?? 1,
      size: value.size ?? 10,
    },
  });

  const hasData =
    bookingQuery.data?.data?.content &&
    bookingQuery.data.data.content.length > 0;

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

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <LoadingDots size="lg" color="primary" />
        </div>
      ) : hasData ? (
        <DataTable
          columns={BookingColumn}
          data={bookingQuery.data?.data?.content ?? []}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <div className="text-xl font-semibold text-muted-foreground mb-2">
            No Bookings Found
          </div>
          <p className="text-muted-foreground">
            There are no bookings matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
