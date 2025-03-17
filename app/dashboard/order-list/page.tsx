"use client";

import React, { useState } from "react";
// import { columns } from "./columns";
// import { DataTable } from "@/components/table/Table";
// import { DataTablePagination } from "@/components/table/Pagination";
// import { Role } from "@/domains/enums";
import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Role } from "@/domains/enums";
import BookingDashboardTable from "@/components/booking-dashboard/table";

const OrderListPage = () => {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.DESIGNER, Role.MANAGER]}>
      <BookingDashboardTable />
    </ProtectedRoute>
  );
};

export default OrderListPage;
