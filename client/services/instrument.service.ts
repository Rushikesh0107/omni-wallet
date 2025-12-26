import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { CardPayload } from "@/types/card";
import { UpiPayload } from "@/types/upi";

export const instrumentService = {
  addCard: async (payload: CardPayload) =>
    await http.post<ApiResponse<{ data: CardPayload; message: string; success: boolean }>>(
      "/instrument/add-card",
      payload
    ),

    addUpi: async (payload: UpiPayload) =>
      await http.post<ApiResponse<{ data: UpiPayload; message: string; success: boolean }>>(
        "/instrument/add-upi",
        payload
      ),
};
