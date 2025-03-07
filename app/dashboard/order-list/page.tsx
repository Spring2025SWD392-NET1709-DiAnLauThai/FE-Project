"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/table/Table";
import { DataTablePagination } from "@/components/table/Pagination";
import { useBookingsQuery } from "@/hooks/booking/use-booking";
import { BookingParams } from "@/domains/models/booking";
import { Role } from "@/domains/enums";
import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Card } from "@/components/ui/card";

const OrderListPage = () => {
  const [params, setParams] = useState<BookingParams>({
    page: 1,
    size: 10,
  });

  const { bookingQuery } = useBookingsQuery({ params });

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page: page,
    });
  };

  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Order List</h1>
        </div>

        <Card className="p-2">
          <>
            <DataTable
              columns={columns}
              data={bookingQuery.data?.data?.content || []}
            />

            <div className="mt-4 flex items-center justify-end px-2">
              <DataTablePagination
                currentPage={(params.page || 0) + 1} // Convert 0-based to 1-based for pagination component
                totalPages={bookingQuery.data?.data?.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default OrderListPage;