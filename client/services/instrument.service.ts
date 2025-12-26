import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { CardPayload } from "@/types/card";

export const instrumentService = {
  addCard: (payload: CardPayload) =>
    http.post<ApiResponse<{ data: CardPayload; message: string; success: boolean }>>(
      "/instrument/add-card",
      payload
    ),
};
