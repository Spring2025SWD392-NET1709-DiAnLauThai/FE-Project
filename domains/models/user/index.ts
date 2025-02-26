import { EnumValues } from "zod";

// create or update user model here
export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  DESIGNER = "DESIGNER",
  MANAGER = "MANAGER",
}

// get all
export interface UserParams {
  id: string;
}

export interface PaginationParams {
  page: number;
  size: number;
}

export interface PaginatedResponse {
  content: UserResponse[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

// response
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  dateOfBirth: Date;
  role: UserRole;
  createdAt: Date;
  status: string;
}

export interface UserPayload {
  email: string;
  name: string;
  phone: number;
  address: string;
  role: UserRole;
  dateOfBirth: Date;
}

export interface ApiResponse {
  code: number;
  data: PaginatedResponse;
  message: string;
}