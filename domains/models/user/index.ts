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

// response
export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
