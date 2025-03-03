"use client";

import { useUser } from "@/hooks/user/use-user";
import { DataTable } from "@/components/table/Table";
import { columns } from "./columns";
import { useState } from "react";
import { DataTablePagination } from "@/components/table/Pagination";
import { CreateUserDialog } from "@/components/user-form/create-user-dialog";
import {
  TableFilter,
  FilterOptions,
} from "@/components/table-filter/TableFilter";
import { UserResponse, UserRole, UserStatus } from "@/domains/models/user";

const ITEMS_PER_PAGE = 10;

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    role: undefined as UserRole | undefined,
    status: undefined as UserStatus | undefined,
    dateFrom: undefined as Date | undefined | null,
    dateTo: undefined as Date | undefined | null,
  });

  // Combine pagination with filters
  const { data, isLoading, error } = useUser({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    ...filters,
  });

  const users = data?.data?.content || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalElements = data?.data?.totalElements || 0;

  // For role filter
  const roleOptions: FilterOptions[] = Object.keys(UserRole).map((role) => ({
    label: role,
    value: role,
  }));

  // For status filter
  const statusOptions: FilterOptions[] = Object.keys(UserStatus).map(
    (status) => ({
      label: status,
      value: status,
    })
  );

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <CreateUserDialog />
      </div>

      <TableFilter
        onFilterChange={handleFilterChange}
        filters={{
          keyword: {
            label: "Search",
            type: "text",
            placeholder: "Search users...",
          },
          role: {
            label: "Role",
            type: "select",
            options: roleOptions,
            placeholder: "Select role",
          },
          status: {
            label: "Status",
            type: "select",
            options: statusOptions,
            placeholder: "Select status",
          },
          dateFrom: {
            label: "From Date",
            type: "date",
          },
          dateTo: {
            label: "To Date",
            type: "date",
          },
        }}
      />

      <DataTable columns={columns} data={users} isLoading={isLoading} />

      <div className="mt-4">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalElements}
        />
      </div>
    </div>
  );
}
