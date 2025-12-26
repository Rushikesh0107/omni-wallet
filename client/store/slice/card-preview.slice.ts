import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardPreviewState = {
  bankName: string;
  cardNumber: string;
  fullName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

const initialState: CardPreviewState = {
  bankName: "",
  cardNumber: "",
  fullName: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
};

const cardPreviewSlice = createSlice({
  name: "cardPreview",
  initialState,
  reducers: {
    updatePreview(state, action: PayloadAction<Partial<CardPreviewState>>) {
      Object.assign(state, action.payload);
    },
    resetPreview() {
      return initialState;
    },
  },
});

export const { updatePreview, resetPreview } = cardPreviewSlice.actions;
export default cardPreviewSlice.reducer;
