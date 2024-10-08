"use client";
import { AlertQueueContextProvider } from "@/context/AlertQueueContextProvider";
import { CurrencyExchangeContextProvider } from "@/context/CurrencyExchangeContextProvider";
import { SnackbarProvider } from "notistack";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CurrencyExchangeContextProvider>
      <SnackbarProvider maxSnack={3}>
        <AlertQueueContextProvider>{children}</AlertQueueContextProvider>
      </SnackbarProvider>
    </CurrencyExchangeContextProvider>
  );
};
