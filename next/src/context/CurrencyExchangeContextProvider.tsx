"use client";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/routes";
import { createContext, useMemo } from "react";
import useSWR from "swr";

export const CurrencyExchangeContext = createContext<
  | {
      currentRate: number | undefined;
      isLoading: boolean;
      error: any;
    }
  | undefined
>(undefined);

export function CurrencyExchangeContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isLoading, error, data } = useSWR(
    API_ROUTES.exchange.currentRate,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  const contextValue = useMemo(
    () => ({
      currentRate: data?.exchange_rate,
      isLoading,
      error,
    }),
    [data, isLoading, error]
  );

  return (
    <CurrencyExchangeContext.Provider value={contextValue}>
      {children}
    </CurrencyExchangeContext.Provider>
  );
}
