"use client";

import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RedirectByRole = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "customer") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  return null;
};
