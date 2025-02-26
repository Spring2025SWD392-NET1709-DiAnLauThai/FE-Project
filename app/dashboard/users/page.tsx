// app/dashboard/users/page.tsx
"use client";

import { useUser } from "@/hooks/user/use-user";
import { DataTable } from "@/components/table/Table";
import { columns } from "./columns";
import { useState, useMemo } from "react";
import { DataTablePagination } from "@/components/table/Pagination";
import { CreateUserDialog } from "@/components/user-form/create-user-dialog";
import {
  TableFilter,
  FilterOptions,
} from "@/components/table-filter/TableFilter";
import { UserResponse } from "@/domains/models/user";

const ITEMS_PER_PAGE = 10;

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Load all users at once for client-side filtering
  const { data: apiResponse, isLoading, error } = useUser(1, 100);

  // Apply filters client-side
  const filteredUsers = useMemo(() => {
    if (!apiResponse?.data?.content) return [];

    return apiResponse.data.content.filter((user: UserResponse) => {
      // Search filter (check name, email, phone)
      if (
        filters.search &&
        !Object.values(user).some((value) =>
          String(value).toLowerCase().includes(filters.search!.toLowerCase())
        )
      ) {
        return false;
      }

      // Role filter
      if (filters.role && user.role !== filters.role) {
        return false;
      }

      // Status filter
      if (filters.status && user.status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.createdFrom) {
        const createdDate = new Date(user.createdAt);
        if (createdDate < filters.createdFrom) {
          return false;
        }
      }

      if (filters.createdTo) {
        const createdDate = new Date(user.createdAt);
        // Add one day to include the end date
        const endDate = new Date(filters.createdTo);
        endDate.setDate(endDate.getDate() + 1);
        if (createdDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [apiResponse, filters]);

  // Calculate pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <CreateUserDialog />
      </div>

      <div className="mb-4">
        <TableFilter onFilterChange={handleFilterChange} />
      </div>

      <DataTable columns={columns} data={paginatedUsers} />
      <div className="mt-4">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
