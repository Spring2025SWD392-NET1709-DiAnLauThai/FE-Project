// create or update user model here
export interface UserPayload {
  id: string;
  name: string;
  email: string;
  password: string;
}

// get all
export type UserParams = RootRequest;

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
