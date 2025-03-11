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
  image_url: string;
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
