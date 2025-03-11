"use client";

import React from "react";
import Layout from "@/components/layout/dashboard-layout";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  const pathname = usePathname();

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
