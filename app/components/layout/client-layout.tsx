"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/dashboard-layout";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR and initial client render, show a basic layout
  if (!isClient) {
    return <div>{children}</div>;
  }

  // After hydration, show the appropriate layout based on auth state
  return (
    <div>
      {user && pathname !== "/" ? (
        <Layout>{children}</Layout>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
