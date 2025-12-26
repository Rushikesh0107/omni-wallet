import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { CardPayload } from "@/types/card";
import { UpiPayload } from "@/types/upi";

export const instrumentService = {
  addCard: (payload: CardPayload) =>
    http.post<ApiResponse<{ data: CardPayload; message: string; success: boolean }>>(
      "/instrument/add-card",
      payload
    ),

    addUpi: (payload: UpiPayload) =>
      http.post<ApiResponse<{ data: UpiPayload; message: string; success: boolean }>>(
        "/instrument/add-upi",
        payload
      ),
};
