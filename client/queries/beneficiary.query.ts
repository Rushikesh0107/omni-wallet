import { useMutation, useQueryClient } from "@tanstack/react-query";
import { beneficiaryService } from "@/services/beneficiary.service";
import {toast} from "sonner"

export const useAddBeneficiary = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: beneficiaryService.addBeneficiary,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["beneficiary"],
            });
            toast.success("Beneficiary added successfully");
        },
        onError: () => {
            toast.error("Failed to add beneficiary");
        }
    });
    return { mutate, isPending };   
}