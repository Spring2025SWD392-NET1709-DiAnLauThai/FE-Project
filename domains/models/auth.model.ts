import { UserStatus } from "@/domains/models/user";
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: string;
}

export interface GoogleAuthCallbackPayload {
  accessToken: string;
  refreshToken: string;
  id: string;
  email: string;
  role: string;
  name: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  status: string;
}