import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Role } from "@/domains/enums";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.MANAGER]}>
      <div className="h-full w-full flex justify-center items-center">
        <LayoutDashboard className="size-24 text-muted-foreground" />
      </div>
      
    </ProtectedRoute>
  );
}
