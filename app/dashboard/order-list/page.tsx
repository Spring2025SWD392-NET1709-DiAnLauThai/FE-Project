import ProtectedRoute from "@/components/auth-provider/protected-route";
import BookingDashboardTable from "@/components/booking-dashboard/table";
import { Role } from "@/domains/enums";
import React from "react";

const OrderRequest = () => {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.DESIGNER, Role.MANAGER]}>
      <BookingDashboardTable />
    </ProtectedRoute>
  );
};

export default OrderRequest;
