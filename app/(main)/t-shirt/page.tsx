import ProtectedRoute from "@/components/auth-provider/protected-route";
import TShirtGrid from "@/components/card/t-shirt-grid";
import { Role } from "@/domains/enums";
import React from "react";

const TShirtPage = () => {
  return (
    <ProtectedRoute allowedRoles={[Role.CUSTOMER]}>
      <main className="flex gap-20">
        <TShirtGrid />
      </main>
    </ProtectedRoute>
  );
};

export default TShirtPage;
