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

export type Role = "ADMIN" | "CUSTOMER" | "DESIGNER" | "MANAGER";

// get all
export interface UserParams extends RootRequest {
  role?: Role;
  activationEnums?: UserStatus;
}

// response
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  status: string;
  image_url: null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  dateOfBirth: string;
  image_url: string;
}

export interface UserPayload {
  email: string;
  name: string;
  phone: number;
  address: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserPutPayload {
  id: string;
  role: UserRole;
  status: UserStatus;
}
