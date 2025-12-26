import { Beneficiary } from "@/types/beneficiary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BeneficiaryState {
    allBeneficiaries: Beneficiary[]; // Original data
    filteredBeneficiaries: Beneficiary[]; // Data for the UI
}

const initialState: BeneficiaryState = {
    allBeneficiaries: [],
    filteredBeneficiaries: []
}

const beneficiarySlice = createSlice({
    name: "beneficiary",
    initialState,
    reducers: {
        setBeneficiaries: (state, action: PayloadAction<Beneficiary[]>) => {
            state.allBeneficiaries = action.payload;
            state.filteredBeneficiaries = action.payload; // Initialize both
        },
        filterBeneficiaries: (state, action: PayloadAction<string>) => {
            const query = action.payload.toLowerCase();
            state.filteredBeneficiaries = state.allBeneficiaries.filter((b) =>
                b.name.toLowerCase().includes(query) || 
                b.phoneNumber.includes(query)
            );
        }
    }
});

export const { setBeneficiaries, filterBeneficiaries } = beneficiarySlice.actions;

export default beneficiarySlice.reducer;
