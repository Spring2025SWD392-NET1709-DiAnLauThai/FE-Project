// create or update user model here
export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  DESIGNER = "DESIGNER",
  MANAGER = "MANAGER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// get all
export type UserParams = RootRequest;

// response
export interface UserResponse {
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
  id: string;
  email: string;
  name: string;
  phone: number;
  address: string;
  role: UserRole;
  dateOfBirth: Date;
  status: UserStatus;
}
