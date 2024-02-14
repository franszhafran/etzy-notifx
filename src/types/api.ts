export type ApiResponse<T> = {
  code: string;
  data: T;
};

export type ApiError = {
  message: string | string[] | undefined | null;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    last_page: number;
    total: number;
  };
}
