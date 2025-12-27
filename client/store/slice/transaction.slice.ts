import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/transaction";

interface TransactionState {
    transactions: Transaction[];
    filteredTransactions: Transaction[];
}

const initialState: TransactionState = {
    transactions: [],
    filteredTransactions: []
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload;
            state.filteredTransactions = action.payload;
        },
        filterTransactions: (state, action: PayloadAction<string>) => {
            const query = action.payload.toLowerCase();
            state.filteredTransactions = state.transactions.filter((tx) => 
                tx.beneficiary.name.toLowerCase().includes(query) ||
                tx.beneficiary.phoneNumber.includes(query) ||
                tx.amount.toString().includes(query)
            );
        }
    }
})

export const { setTransactions, filterTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;