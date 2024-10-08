"use client";
import SendIcon from "@mui/icons-material/Send";
import { CurrencyInput } from "../atoms/CurrencyInput";
import { Controller, useForm } from "react-hook-form";
import { Button, CircularProgress, IconButton } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { API_ROUTES } from "@/api/routes";
import { mutatePOSTFetcher } from "@/api/fetcher";
import cx from "classnames";
import { useAlertQueueContext } from "@/hooks/useAlertQueueContext";

interface FormValues {
  currencyAmount: string;
}

interface CurrencyTransactionResult {
  amountPLN: number;
  amountEUR: number;
  rate: number;
}

const sanitizeCurrencyValue = (value: string) => {
  return value
    .trim()
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/(\.\d{2})\d+/, "$1");
};

export const CurrencyTransactionForm = () => {
  const {
    handleSubmit,
    control,
    resetField,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const { addAlert } = useAlertQueueContext();
  const { trigger, isMutating } = useSWRMutation(
    API_ROUTES.exchange.currencyTransaction,
    mutatePOSTFetcher
  );

  const onSubmit = async (data: FormValues) => {
    reset();
    try {
      const result = await trigger<CurrencyTransactionResult>({
        amountEUR: parseFloat(data.currencyAmount),
      });
      addAlert({
        message: `Bought ${result.amountPLN} PLN, with rate of: ${result.rate}`,
        type: "success",
      });
    } catch (error) {
      addAlert({
        message: `The transaction failed.`,
        type: "error",
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="w-full flex flex-col gap-5 items-center justify-center"
    >
      <Controller
        control={control}
        name="currencyAmount"
        rules={{
          required: true,
          min: {
            value: 0.01,
            message: "Currency must be bigger than 0",
          },
          max: {
            value: 9999999999999999,
            message: "Currency amount too big",
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CurrencyInput
            error={error}
            value={value}
            handleChange={(event) => {
              if (event.target.value === "") {
                resetField("currencyAmount");
                return;
              }

              event.target.value = sanitizeCurrencyValue(event.target.value);
              onChange(event);
            }}
            onBlur={onBlur}
          />
        )}
      />
      <Button
        className={cx("w-full rounded-md", { "cursor-progress": isMutating })}
        color="success"
        variant="contained"
        type="submit"
        disabled={!isValid}
      >
        {isMutating ? <CircularProgress size={25} /> : "Exchange"}
      </Button>
    </form>
  );
};
