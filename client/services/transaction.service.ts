// transaction.service.ts
import { http } from "@/lib/http";
import { PayNowPayload, Transaction } from "@/types/transaction";

export const transactionService = {
  getTransactions: async () => {
    const res = await http.get<Transaction[]>(
      "/transaction/get-transaction-by-user-id"
    );

    return res.data;
  },

  payNow: async (payload: PayNowPayload) => {
    const res = await http.post<PayNowPayload>("/transaction/send-money", payload);
    return res.data;
  },
};
