import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Role } from "@/domains/enums";
import React from "react";

const OrderRequest = () => {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.DESIGNER, Role.MANAGER]}>
      OrderRequest
    </ProtectedRoute>
  );
};

export default OrderRequest;
