"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { redirect, useSearchParams } from "next/navigation";
import * as React from "react";
export default function GoogleLoginPage() {
  const pathname = useSearchParams();
  const { login } = useAuthStore();

  const refetchToken = pathname?.get("accessToken");
  const refetchRefreshToken = pathname?.get("refreshToken");

  console.log("refetchToken", refetchToken);
  console.log("refetchRefreshToken", refetchRefreshToken);

  if (refetchToken && refetchRefreshToken) {
    localStorage.setItem("accessToken", refetchToken);
    localStorage.setItem("refreshToken", refetchRefreshToken);
    login(refetchToken, refetchRefreshToken);

    return redirect("/t-shirt");

    // return <Redirect href="/t-shirt" />;
  }

  return <div></div>;
}
