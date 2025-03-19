"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/domains/enums";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, role, validate } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      validate();
    }, 3000);
  }, [validate]);

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
