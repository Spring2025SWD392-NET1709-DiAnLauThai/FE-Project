"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Task, TaskStatus } from "@/domains/models/tasks";
import { MenuAction, MenuActions } from "@/components/table/Menu";
import { Badge } from "@/components/ui/badge";
import { TaskDetailCard } from "@/components/assign-task/task-detail";
import { PlusIcon } from "lucide-react";

// Define task actions
const taskActions: MenuAction<Task>[] = [
  {
    label: "View Details",
    dialogTitle: "Task Details",
    renderContent: (task) => <TaskDetailCard task={task} />,
  },
  // Add more actions as needed
];

interface ColumnActions {
  setAssignModalOpen: (open: boolean) => void;
  setSelectedTask: (task: Task | null) => void;
}

export const generateColumns = ({
  setAssignModalOpen,
  setSelectedTask,
}: ColumnActions): ColumnDef<Task>[] => [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "designerName",
    header: "Assigned Designer",
    cell: ({ row }) => {
      const designerName = row.getValue("designerName") as string;
      const task = row.original;

      if (!designerName) {
        return (
          <button
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              setAssignModalOpen(true);
              setSelectedTask(task);
            }}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            <span>Assign Designer</span>
          </button>
        );
      }

      return <span>{designerName}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus;

      let badgeClass = "";
      switch (status) {
        case TaskStatus.PENDING:
          badgeClass = "bg-yellow-500 hover:bg-yellow-600";
          break;
        case TaskStatus.PROGRESSING:
          badgeClass = "bg-blue-500 hover:bg-blue-600";
          break;
        case TaskStatus.COMPLETED:
          badgeClass = "bg-green-500 hover:bg-green-600";
          break;
        case TaskStatus.CANCELLED:
          badgeClass = "bg-red-500 hover:bg-red-600";
          break;
        default:
          badgeClass = "bg-gray-500 hover:bg-gray-600";
      }

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <MenuActions entity={task} entityType="task" actions={taskActions} />
      );
    },
  },
];

// Cột mặc định không có state
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "designerName",
    header: "Assigned Designer",
    cell: ({ row }) => {
      const designerName = row.getValue("designerName") as string;

      if (!designerName) {
        return (
          <div className="flex items-center text-sm text-blue-600">
            <PlusIcon className="w-4 h-4 mr-1" />
            <span>Assign Designer</span>
          </div>
        );
      }

      return <span>{designerName}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as TaskStatus;

      let badgeClass = "";
      switch (status) {
        case TaskStatus.PENDING:
          badgeClass = "bg-yellow-500 hover:bg-yellow-600";
          break;
        case TaskStatus.PROGRESSING:
          badgeClass = "bg-blue-500 hover:bg-blue-600";
          break;
        case TaskStatus.COMPLETED:
          badgeClass = "bg-green-500 hover:bg-green-600";
          break;
        case TaskStatus.CANCELLED:
          badgeClass = "bg-red-500 hover:bg-red-600";
          break;
        default:
          badgeClass = "bg-gray-500 hover:bg-gray-600";
      }

      return <Badge className={badgeClass}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <MenuActions entity={task} entityType="task" actions={taskActions} />
      );
    },
  },
];

// Dữ liệu giả để kiểm tra
// Dữ liệu giả để kiểm tra đã cập nhật thêm footlineImage
export const mockTasks: Task[] = [
  {
    id: "task-001",
    orderId: "ORD-2024-001",
    subject: "Company Logo Design",
    description:
      "Design a modern logo for ABC Corporation that reflects their values of innovation and sustainability.",
    status: TaskStatus.PENDING,
    createdAt: "2024-02-10T10:30:00Z",
    updatedAt: "2024-02-10T10:30:00Z",
    designerId: "designer-1",
    designerName: "Jane Cooper",
    footlineImage:
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300",
  },
  {
    id: "task-002",
    orderId: "ORD-2024-002",
    subject: "Website Redesign",
    description:
      "Redesign the homepage of XYZ Company to improve user engagement and conversion rates.",
    status: TaskStatus.PROGRESSING,
    createdAt: "2024-02-12T09:15:00Z",
    updatedAt: "2024-02-15T14:20:00Z",
    designerId: "designer-2",
    designerName: "Alex Johnson",
    footlineImage:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=300",
  },
  {
    id: "task-003",
    orderId: "ORD-2024-003",
    subject: "Mobile App Icons",
    description:
      "Create a set of consistent icons for a mobile application focusing on fitness tracking.",
    status: TaskStatus.COMPLETED,
    createdAt: "2024-01-25T11:00:00Z",
    updatedAt: "2024-02-08T16:45:00Z",
    designerId: "designer-3",
    designerName: "Maria Garcia",
    footlineImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300",
  },
  {
    id: "task-004",
    orderId: "ORD-2024-004",
    subject: "Product Packaging Design",
    description:
      "Design eco-friendly packaging for a new organic skincare line.",
    status: TaskStatus.CANCELLED,
    createdAt: "2024-02-01T13:20:00Z",
    updatedAt: "2024-02-05T10:10:00Z",
    designerId: "aaa",
    designerName: "aaaa",
    footlineImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300",
  },
  {
    id: "task-005",
    orderId: "ORD-2024-005",
    subject: "Social Media Graphics",
    description:
      "Create a set of templates for Instagram posts promoting summer collection.",
    status: TaskStatus.PENDING,
    createdAt: "2024-02-18T08:45:00Z",
    updatedAt: "2024-02-18T08:45:00Z",
    designerId: "",
    designerName: "",
    footlineImage:
      "https://images.unsplash.com/photo-1622573011056-7d9d3b846fc0?q=80&w=300",
  },
  {
    id: "task-006",
    orderId: "ORD-2024-006",
    subject: "Email Newsletter Template",
    description:
      "Design a responsive email template for monthly newsletters that highlights product features.",
    status: TaskStatus.PROGRESSING,
    createdAt: "2024-02-14T15:30:00Z",
    updatedAt: "2024-02-16T09:25:00Z",
    designerId: "designer-1",
    designerName: "Jane Cooper",
    footlineImage:
      "https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?q=80&w=300",
  },
  {
    id: "task-007",
    orderId: "ORD-2024-007",
    subject: "Conference Poster Design",
    description:
      "Create an eye-catching poster for the annual tech conference happening next month.",
    status: TaskStatus.PENDING,
    createdAt: "2024-02-20T11:15:00Z",
    updatedAt: "2024-02-20T11:15:00Z",
    designerId: "aaaa",
    designerName: "aaaa",
    footlineImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300",
  },
  {
    id: "task-008",
    orderId: "ORD-2024-008",
    subject: "Brochure Layout",
    description:
      "Design a tri-fold brochure showcasing company services and case studies.",
    status: TaskStatus.PROGRESSING,
    createdAt: "2024-02-17T13:40:00Z",
    updatedAt: "2024-02-19T16:20:00Z",
    designerId: "designer-4",
    designerName: "John Smith",
    footlineImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=300",
  },
];
