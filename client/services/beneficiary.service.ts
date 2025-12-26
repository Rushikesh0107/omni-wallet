import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { AddBeneficiaryPayload } from "@/types/beneficiary";

export const beneficiaryService = {
  addBeneficiary: (payload: AddBeneficiaryPayload) =>
    http.post<ApiResponse<AddBeneficiaryPayload>>(
      "/beneficiary/add-beneficiary",
      payload
    ),
};
