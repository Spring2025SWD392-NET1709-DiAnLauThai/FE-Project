"use client";

import { Role } from "@/domains/enums";
import { useAuthStore } from "@/domains/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { role } = useAuthStore();
  const router = useRouter();
  console.log("Current role:", role);
  console.log("Allowed roles:", allowedRoles);
  useEffect(() => {
    if (role !== null && !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [role, router, allowedRoles]);

  return <>{role !== null && allowedRoles.includes(role) ? children : null}</>;
};

export default ProtectedRoute;
