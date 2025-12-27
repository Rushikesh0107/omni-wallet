import { transactionService } from "@/services/transaction.service"
import { useQuery } from "@tanstack/react-query"

export const useGetTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: transactionService.getTransactions,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchInterval: 5 * 60 * 1000,
        refetchIntervalInBackground: true,
    })
}