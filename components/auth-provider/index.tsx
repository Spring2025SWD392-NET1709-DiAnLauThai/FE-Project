"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken, router]);

  return <>{children}</>;
};
