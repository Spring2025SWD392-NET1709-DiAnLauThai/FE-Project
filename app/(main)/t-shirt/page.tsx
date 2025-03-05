"use client";

import ProtectedRoute from "@/components/auth-provider/protected-route";
import TShirtGrid from "@/components/card/t-shirt-grid";
import { Role } from "@/domains/enums";
import { useTShirtsQuery } from "@/hooks/t-shirt/use-tshirt";
import React from "react";

const TShirtPage = () => {
  const { queryTShirts } = useTShirtsQuery({
    params: {
      page: 1,
      size: 10,
    },
  });

  console.log("queryTShirts", queryTShirts.data);

  return (
    <ProtectedRoute allowedRoles={[Role.CUSTOMER]}>
      <main className="flex gap-20">
        <TShirtGrid />
      </main>
    </ProtectedRoute>
  );
};

export default TShirtPage;
