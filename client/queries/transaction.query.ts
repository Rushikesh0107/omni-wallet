import { transactionService } from "@/services/transaction.service"
import { ApiError } from "@/types/api"
import { PayNowPayload } from "@/types/transaction"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionService.getTransactions,
    staleTime: 0, 
    refetchOnWindowFocus: false,
  });
};


export const usePayNow = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, PayNowPayload>({
    mutationKey: ["pay-now"],
    mutationFn: transactionService.payNow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};

