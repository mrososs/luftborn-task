/** Standard API envelope for all HTTP responses */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/** Paginated list response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}

/** Generic pagination query params */
export interface PaginationParams {
  page: number;
  pageSize: number;
}
