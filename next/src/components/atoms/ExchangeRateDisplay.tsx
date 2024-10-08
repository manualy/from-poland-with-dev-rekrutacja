"use client";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/routes";
import { Box, Typography } from "@mui/material";
import useSWR from "swr";
import cx from "classnames";
import { isErrored } from "stream";

export const ExchangeRateDisplay = () => {
  const { isLoading, error, data } = useSWR(
    API_ROUTES.exchange.currentRate,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return (
    <Box className="w-full flex flex-col justify-center items-center p-5 border-solid border-gray-500 rounded-md border-[0.0625rem]">
      <Typography variant="h5" component="div" gutterBottom textAlign="center">
        PLN to EUR Exchange Rate
      </Typography>
      <Typography
        variant="h4"
        color={error ? "error" : "primary"}
        fontWeight="bold"
        className={cx({ "blur-xl": isLoading })}
      >
        {error
          ? "-,-- EUR"
          : isLoading
          ? 4.44
          : parseFloat(data.exchange_rate).toFixed(2) + " EUR"}
      </Typography>
    </Box>
  );
};
