import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { Card } from "@/types/card";

export const instrumentService = {
  addCard: (payload: Card) =>
    http.post<ApiResponse<{ data: Card; message: string; success: boolean }>>(
      "/instrument/add-card",
      payload
    ),
};
