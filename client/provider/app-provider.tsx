// src/provider/app-provider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import QueryProvider from "@/provider/query-provider";
import { Toaster } from "sonner";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <Toaster />
        {children}
      </QueryProvider>
    </Provider>
  );
}
