import { useContext } from "react";
import { CurrencyExchangeContext } from "@/context/CurrencyExchangeContextProvider";

export const useCurrencyExchangeContext = () => {
  const context = useContext(CurrencyExchangeContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useCurrencyExchangeContext must be used within a CurrencyExchangeContextProvider."
    );
  }

  return context;
};
