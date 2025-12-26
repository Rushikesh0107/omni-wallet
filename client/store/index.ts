import { configureStore } from "@reduxjs/toolkit";
import cardPreviewReducer from "./slice/card-preview.slice";

export const store = configureStore({
  reducer: {
    cardPreview: cardPreviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
