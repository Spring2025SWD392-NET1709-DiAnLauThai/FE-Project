"use client";

import { useUser } from "@/hooks/user/use-user";
import { DataTable } from "@/components/table/Table";
import { columns } from "./columns";
import { useState } from "react";
import { DataTablePagination } from "@/components/table/Pagination";
import { CreateUserDialog } from "@/components/create-user-form/create-user-dialog";

const ITEMS_PER_PAGE = 10;

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useUser(currentPage, ITEMS_PER_PAGE);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  // Access the nested data structure
  const users = apiResponse?.data?.content || [];
  const totalPages = apiResponse?.data?.totalPages || 0;

  const handlePageChange = (page: number) => {
    const validPage = Math.max(1, page);
    setCurrentPage(validPage);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <CreateUserDialog />
      </div>
      <DataTable columns={columns} data={users} />
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
