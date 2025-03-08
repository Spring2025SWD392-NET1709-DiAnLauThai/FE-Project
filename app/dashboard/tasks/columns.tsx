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
      return "secondary";
    case TaskStatus.COMPLETED:
      return "default";
    case TaskStatus.DENIED:
      return "destructive";
    default:
      return "outline";
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
    accessorKey: "taskId", // Added task ID column
    header: "Task ID",
    cell: ({ row }) => {
      const taskId = row.original.taskId;
      return (
        <div className="font-medium">
          {taskId ? taskId.substring(0, 8) + "..." : "N/A"}
        </div>
      );
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
        <Badge variant={getStatusBadge(status)}>{status || "Unknown"}</Badge>
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
