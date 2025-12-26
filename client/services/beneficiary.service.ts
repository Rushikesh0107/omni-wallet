import { http } from "@/lib/http";
import { ApiResponse } from "@/types/api";
import { AddBeneficiaryPayload, Beneficiary } from "@/types/beneficiary";

export const beneficiaryService = {
  addBeneficiary: async(payload: AddBeneficiaryPayload) =>
    await http.post<ApiResponse<Beneficiary>>(
      "/beneficiary/add-beneficiary",
      payload
    ),

  getBeneficiaries: async (): Promise<Beneficiary[]> => {
    const response = await http.get<Beneficiary[]>(
      "/beneficiary/get-beneficiary-by-user-id"
    );
    return response.data; // 👈 unwrap AxiosResponse
  },
};
