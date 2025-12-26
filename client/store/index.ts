import { configureStore } from "@reduxjs/toolkit";
import cardPreviewReducer from "./slice/card-preview.slice";
import beneficiaryReducer from "./slice/beneficiary.silce";

export const store = configureStore({
  reducer: {
    cardPreview: cardPreviewReducer,
    beneficiary: beneficiaryReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
