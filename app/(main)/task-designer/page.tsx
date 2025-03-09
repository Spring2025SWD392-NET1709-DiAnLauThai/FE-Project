import ProtectedRoute from "@/components/auth-provider/protected-route";
import ShowTask from "@/components/designer-task/ShowTask";
import { Role } from "@/domains/enums";

export default function TaskDesignerPage() {
  return (
    <ProtectedRoute allowedRoles={[Role.DESIGNER]}>
      
      <ShowTask />
    </ProtectedRoute>
  );
}