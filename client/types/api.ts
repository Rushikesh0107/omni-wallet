// src/types/api.ts
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success : boolean;
};

export type ApiError = {
  message: string;
  data : null;
  success : boolean;
};
