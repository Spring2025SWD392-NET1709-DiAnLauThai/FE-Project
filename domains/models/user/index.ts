// create or update user model here
export interface UserPayload {
  id: string;
  name: string;
  email: string;
  password: string;
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
  phone: string;
  address: string;
  dateOfBirth: Date;
  role: string;
  createdAt: Date;
  status: string;
}

export interface ApiResponse {
  code: number;
  data: PaginatedResponse;
  message: string;
}