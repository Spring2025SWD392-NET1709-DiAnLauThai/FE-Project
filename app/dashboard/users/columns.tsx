"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserPayload, UserResponse, UserStatus } from "@/domains/models/user";
import { Badge } from "@/components/ui/badge";
import { MenuAction, MenuActions } from "@/components/table/Menu";
import { UserDetailCard } from "@/components/user-card/user-detail-card";
import { UserForm } from "@/components/user-form/user-form";
import { useUserForm } from "@/hooks/user/use-user-form";
import { format } from "date-fns";

export const columns: ColumnDef<UserPayload>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "dateOfBirth",
    header: "DOB",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateOfBirth"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as UserStatus;

      // Define colors based on status
      const badgeClass =
        status === UserStatus.ACTIVE
          ? "bg-green-500 hover:bg-green-600 text-white" // Active: Green
          : "bg-red-500 hover:bg-red-600 text-white"; // Inactive: Red

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
if (user.role === "ADMIN" || user.role === "MANAGER") {
  return null; // Or return a placeholder/disabled indicator
}

      // Convert user to UserPayload for the form
      const userAsPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: String(user.phone),
        address: user.address || "",
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        status: user.status || UserStatus.ACTIVE,
      };

      // Define actions
      const userActions: MenuAction<UserPayload>[] = [
        {
          label: "View Details",
          dialogTitle: "User Details",
          renderContent: (user) => <UserDetailCard user={user} />,
        },
        {
          label: "Edit",
          dialogTitle: "Edit User Profile",
          renderContent: (user, closeDialog) => {
            const { form, onSubmit, isLoading, reset } = useUserForm({
              type: "update",
              defaultData: userAsPayload,
            });

            const handleFormSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              const success = await onSubmit(e);
              if (success) {
                closeDialog();
              }
            };

            return (
              <UserForm
                form={form}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                type="update"
                isAdminUpdate={true}
              />
            );
          },
        },
        
      ];

      return (
        <MenuActions entity={user} entityType="user" actions={userActions} />
      );
    },
  },
];
