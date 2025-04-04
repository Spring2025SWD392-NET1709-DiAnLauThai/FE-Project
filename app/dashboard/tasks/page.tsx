"use client";

import { useState } from "react";
import { TaskStatus } from "@/domains/models/tasks";
import { useTasksQuery } from "@/hooks/tasks/use-task";
import { DataTable } from "@/components/table/Table";
import { taskColumns } from "./columns";
import PaginationTable from "@/components/plugins/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingDots } from "@/components/plugins/ui-loading/loading-dots";

export default function TasksPage() {
  // Using our task query hook with default params
  const { tasksQuery, params, updateFilters, isLoading } = useTasksQuery();

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({
      designerName: e.target.value,
    });
  };

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    updateFilters({
      taskStatus: value === "ALL" ? undefined : (value as TaskStatus),
    });
  };

  const hasData = tasksQuery.data?.data?.content && tasksQuery.data.data.content.length > 0;
  return (
    <div className="container mx-auto py-8">
      {/* Added headline */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all designer tasks
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Search by designer name..."
              className="max-w-sm"
              value={params.designerName || ""}
              onChange={handleSearch}
            />

            <Select onValueChange={handleStatusChange} defaultValue="ALL">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value={TaskStatus.ASSIGNED}>Assigned</SelectItem>
                <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
                <SelectItem value={TaskStatus.DENIED}>Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <PaginationTable
              value={
                tasksQuery.data?.data ?? {
                  content: [],
                  totalElements: 0,
                  totalPages: 0,
                  pageSize: 0,
                  pageNumber: 0,
                }
              }
              onPageChange={(page: number) => updateFilters({ page })}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <LoadingDots size="lg" color="primary" />
          </div>
        ) : hasData ? (
          <DataTable
            columns={taskColumns}
            data={tasksQuery.data?.data?.content ?? []}
          />
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <p className="text-muted-foreground text-lg">No tasks found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or adding new tasks
            </p>
          </div>
          
        )}

      </div>
    </div>
  );
}
