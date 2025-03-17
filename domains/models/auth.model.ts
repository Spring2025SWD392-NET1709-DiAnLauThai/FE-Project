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


