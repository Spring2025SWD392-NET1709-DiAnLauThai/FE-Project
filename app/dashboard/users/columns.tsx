"use client"

import { ColumnDef } from "@tanstack/react-table"

import { format } from "date-fns"
import { UserResponse } from "@/domains/models/user"
import { MenuActions } from "@/components/table/Menu"

export const columns: ColumnDef<UserResponse>[] = [
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
      return <div>{date.toLocaleDateString()}</div>;
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <MenuActions user={row.original} />;
    },
  },
];