"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/domains/enums";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else if (user && role === Role.CUSTOMER) {
      router.replace("/t-shirt");
    } else if (user && role !== Role.CUSTOMER) {
      router.replace("/dashboard");
    }
  }, [role, user, router]);

  return <>{children}</>;
};
