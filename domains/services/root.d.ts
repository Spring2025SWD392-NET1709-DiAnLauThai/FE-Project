export {};
declare global {
  interface RootResponse<T> {
    code: number;
    message: string;
    data: T;
  }

  interface RootRequest {
    page: number;
    size: number;
  }
  interface Pagination<T> {
    content: T[];
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }

  enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    DESIGNER = "DESIGNER",
    MANAGER = "MANAGER",
  }

  interface TokenResponse {
    sub: string;
    role: string;
    iat: number;
    exp: number;
  }
}
