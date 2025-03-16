"use client";

import React from "react";
import SearchInput from "../plugins/search-input";
import { useBookingsQuery } from "@/hooks/booking/use-booking";
import PaginationTable from "../plugins/pagination";
import { BookingResponse } from "@/domains/models/booking";
import { useParamStore } from "@/domains/stores/params-store";
import { DataTable } from "../plugins/table";
import { BookingDashboardColumn } from "./column";
import { Loader2 } from "lucide-react"; // Import loader icon
import { LoadingDots } from "../plugins/ui-loading/loading-dots";

const BookingDashboardTable = () => {
  const { value } = useParamStore();

  const { bookingQuery, isLoading } = useBookingsQuery({
    params: {
      page: value.page ?? 1,
      size: value.size ?? 10,
    },
  });

  const hasNoBookings =
    bookingQuery.isSuccess &&
    (!bookingQuery.data?.data?.content ||
      bookingQuery.data.data.content.length === 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Booking Management</h1>
      </div>
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
        <div className="py-20 flex flex-col items-center justify-center">
          <LoadingDots/>
        </div>
      ) : hasNoBookings ? (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">No orders found</p>
        </div>
      ) : (
        <DataTable
          columns={BookingDashboardColumn}
          data={bookingQuery.data?.data?.content ?? []}
        />
      )}
    </div>
  );
};

export default BookingDashboardTable;
