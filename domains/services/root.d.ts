export {};
declare global {
  interface RootResponse<T> {
    code: number;
    message: string;
    data: T;
  }

  interface RootRequest {
    page?: number;
    size?: number;
    keyword?: string;
    // role?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    sortDir?: "asc" | "desc";
    sortBy?: string;
  }

  interface Pagination<T> {
    content: T[];
    totalElements: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }

  interface TokenResponse {
    sub: string;
    role: string;
    iat: number;
    exp: number;
  }
}
