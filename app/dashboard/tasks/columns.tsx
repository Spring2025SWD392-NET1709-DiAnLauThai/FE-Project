"use client";

import { Task, TaskStatus } from "@/domains/models/tasks";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatFromISOStringVN, FormatType } from "@/lib/format";
import TaskMenuAction from "@/components/assign-task/task-menu-action";

// Helper function to get status badge variant
const getStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ASSIGNED:
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case TaskStatus.COMPLETED:
      return "bg-green-500 hover:bg-green-600 text-white";
    case TaskStatus.CANCEL:
      return "bg-red-500 hover:bg-red-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white";
  }
};

// Task columns definition - fixed to use Task instead of PaginatedTaskResponse
export const taskColumns: ColumnDef<Task>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "designerName",
    header: "Assigned To",
    cell: ({ row }) => {
      return <div>{row.original.designerName || "Not assigned"}</div>;
    },
  },
  {
    accessorKey: "taskStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.taskStatus as TaskStatus;
      return (
        <Badge className={getStatusBadge(status)}>{status || "Unknown"}</Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.startDate
            ? formatFromISOStringVN(
                row.original.startDate,
                FormatType.DATETIME_VN
              )
            : "Not set"}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "Deadline Date",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.endDate
            ? formatFromISOStringVN(
                row.original.endDate,
                FormatType.DATETIME_VN
              )
            : "Not set"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return <TaskMenuAction task={task} />;
    },
  },
];
