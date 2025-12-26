import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { TSignUpPayload, TSignInPayload } from "@/types/auth";

export const authService = {
  signUp: async(payload: TSignUpPayload) =>
    await http.post<ApiResponse<{ data: User; message: string; success: boolean }>>(
      "/auth/register",
      payload
    ),

    signIn : async (payload : TSignInPayload) => await http.post<ApiResponse<{ data: User; message: string; success: boolean }>>(
      "/auth/login",
      payload
    )
};
