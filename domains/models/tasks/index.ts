import {  UserRole } from "@/domains/models/user";
// domains/models/task/index.ts
export enum TaskStatus {
  PENDING = "PENDING",
  PROGRESSING = "PROGRESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface AssignDesignerPayload {
  bookingId: string;
  designerId: string;
}

export interface Designer {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  dateOfBirth: Date;
  role: UserRole.DESIGNER;
  createdAt: Date;
  status: string;
  image_url: string;
}


export interface DesignersResponse {
  content: Designer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


export interface Task {
  bookingId: string;
  designerId: string;
  id: string;
  taskStatus: string;
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
