"use client";

import { useCurrencyExchangeContext } from "@/hooks/useCurrencyExchangeContext";
import {
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { useMemo } from "react";
import { FieldError } from "react-hook-form";

interface CurrencyInputProps {
  error: FieldError | undefined;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CurrencyInput = ({
  error,
  value,
  handleChange,
  onBlur,
}: CurrencyInputProps) => {
  const { currentRate } = useCurrencyExchangeContext();

  const amountPLN = useMemo(
    () =>
      currentRate && value ? (currentRate * parseFloat(value)).toFixed(2) : "",
    [value]
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <FormControl fullWidth error={!!error}>
        <InputLabel>Amount</InputLabel>
        <OutlinedInput
          color="primary"
          startAdornment={<InputAdornment position="start">€</InputAdornment>}
          label="Amount"
          onChange={handleChange}
          onBlur={onBlur}
          value={value || ""}
        />
      </FormControl>
      <FormControl fullWidth>
        <OutlinedInput
          disabled
          value={amountPLN}
          color="primary"
          startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
        />
      </FormControl>
    </div>
  );
};
