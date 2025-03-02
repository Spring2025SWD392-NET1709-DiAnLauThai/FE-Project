// domains/models/task/index.ts
export enum TaskStatus {
  PENDING = "PENDING",
  PROGRESSING = "PROGRESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Designer {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  subject: string;
  description: string;
  orderId: string;
  designerId: string;
  designerName: string; // For display purposes
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  footlineImage: string; // URL to the footline image
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string; // For display purposes
  content: string;
  createdAt: string;
}

export interface TaskParams {
  page: number;
  size: number;
  status?: TaskStatus;
}

export interface PaginatedTaskResponse {
  data: Task[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
