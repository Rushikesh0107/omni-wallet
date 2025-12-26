// src/lib/http.ts
import axios from "axios";
import type { ApiError } from "@/types/api";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response.data,
  (error): Promise<ApiError> => {
    const apiError: ApiError = {
      message:
        error?.response?.data?.message || error?.message || "Unexpected error",
      data: null,
      success: false,
    };

    return Promise.reject(apiError);
  }
);

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
