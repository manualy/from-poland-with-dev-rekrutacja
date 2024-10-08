export const API_ROUTES = {
  exchange: {
    currentRate: `${process.env.NEXT_PUBLIC_API_URL}/exchange/current-rate`,
    currencyTransaction: `${process.env.NEXT_PUBLIC_API_URL}/exchange/currency-transaction`,
  },
};
