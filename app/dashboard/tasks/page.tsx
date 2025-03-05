"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/domains/models/tasks";
import { useTasks } from "@/hooks/assign-tasks/use-task";
import { DataTable } from "@/components/table/Table";
import { generateColumns, mockTasks } from "./columns";
import { DataTablePagination } from "@/components/table/Pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AssignDesignerForm } from "@/components/assign-task/task-assign-design";
import { Input } from "@/components/ui/input";
import {
  TaskTableFilter,
  TaskFilterOptions,
} from "@/components/table-filter/TaskTableFilter";
import ProtectedRoute from "@/components/auth-provider/protected-route";
import { Role } from "@/domains/enums";

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState<TaskFilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sử dụng dữ liệu giả thay vì gọi API
  useEffect(() => {
    // Giả lập thời gian tải để tạo trải nghiệm thực tế hơn
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dữ liệu giả từ mockTasks - không sử dụng API
  const data = {
    data: mockTasks,
    totalItems: mockTasks.length,
    totalPages: Math.ceil(mockTasks.length / size),
    currentPage: page,
  };

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleFilterChange = (newFilters: TaskFilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Reset to first page on search change
    setPage(1);
  };

  // Filter data based on search query and filter options
  const filteredData = data.data.filter((task) => {
    // Kiểm tra điều kiện tìm kiếm
    const matchesSearch = !searchQuery
      ? true
      : task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.designerName &&
          task.designerName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Kiểm tra các bộ lọc
    const matchesStatus = !filters.status
      ? true
      : task.status === filters.status;

    // Trả về true nếu thỏa mãn cả hai điều kiện
    return matchesSearch && matchesStatus;
  });

  // Phân trang thủ công sau khi lọc
  const paginatedData = filteredData.slice((page - 1) * size, page * size);

  // Số trang sau khi lọc
  const totalFilteredPages = Math.ceil(filteredData.length / size);

  // Generate columns with the assign designer capability
  const columns = generateColumns({
    setAssignModalOpen,
    setSelectedTask,
  });

  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.MANAGER, Role.DESIGNER]}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Task Management</h1>

        <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Assign Designer to Task</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <AssignDesignerForm
                task={selectedTask}
                onSuccess={() => setAssignModalOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
            <TaskTableFilter onFilterChange={handleFilterChange} />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={paginatedData} />

            <div className="mt-4">
              <DataTablePagination
                currentPage={page}
                totalPages={totalFilteredPages || 1}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
