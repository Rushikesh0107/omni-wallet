// transaction.service.ts
import { http } from "@/lib/http";
import { Transaction } from "@/types/transaction";

export const transactionService = {
  getTransactions: async () => {
    const res = await http.get<Transaction[]>(
      "/transaction/get-transaction-by-user-id"
    );

    return res.data;
  },
};
