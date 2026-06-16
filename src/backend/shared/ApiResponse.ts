export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  requestId?: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function apiSuccess<T>(data: T, requestId?: string): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    requestId,
  };
}

export function apiError(code: string, message: string, details?: unknown, requestId?: string): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    requestId,
  };
}
