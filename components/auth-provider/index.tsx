"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Role } from "@/domains/enums";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, role } = useAuthStore();
  const path = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else if (role === Role.CUSTOMER) {
      router.replace("/t-shirt");
    } else if (role === Role.DESIGNER) {
      router.replace("/task-designer");
    } else if (role === Role.ADMIN || role === Role.MANAGER) {
      router.replace("/dashboard");
    }
  }, [role, user, router]);

  return <>{children}</>;
};
