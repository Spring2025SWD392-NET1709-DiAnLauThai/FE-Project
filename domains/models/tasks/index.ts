import {  UserRole } from "@/domains/models/user";
import { TShirtResponse } from "../tshirt";
// domains/models/task/index.ts
export enum TaskStatus {
  ASSIGNED = "ASSIGNED",
  COMPLETED = "COMPLETE",
  CANCEL = "DENIED",
}

export enum BookingStatus {
  DEPOSITED = "DEPOSITED",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
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
  taskId: string;
  designerName: string;
  taskStatus: string;
  bookingId: string;
  startDate: Date;
  endDate: Date;
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
  designerName: string;
  startDate?: Date;
  endDate?: Date;
  sortDir?: string;
  taskStatus?: TaskStatus;
}

export interface PaginatedTaskResponse {
  data: Task[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

interface Design {
  designFile: string;
}

export interface BookingDetail {
  bookingDetailId: string;
  description: string;
  unitPrice: number;
  design: Design;
  tshirt: TShirtResponse | null;
}

export interface TaskDetail {
  designerName: string;
  totalPrice: number;
  totalQuantity: number;
  bookingStatus: BookingStatus
  datecreated: string;
  updateddate: string;
  startdate: string;
  enddate: string;
  code: string;
  title: string;
  bookingDetails: BookingDetail[];
}

export interface TaskConfirm {
  bookingId: string;
}
