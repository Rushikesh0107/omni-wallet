import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { beneficiaryService } from "@/services/beneficiary.service";
import { toast } from "sonner";

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
    },
  });
  return { mutate, isPending };
};

export const useGetBeneficiary = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["beneficiary"],
    queryFn: beneficiaryService.getBeneficiaries,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return { data, isLoading };
};
