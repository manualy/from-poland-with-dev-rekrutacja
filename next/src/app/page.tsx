import { CurrencyInput } from "@/components/atoms/CurrencyInput";
import { ExchangeRateDisplay } from "@/components/atoms/ExchangeRateDisplay";
import { CurrencyTransactionForm } from "@/components/molecules/CurrencyTransactionForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-2 px-10 gap-36 sm:pt-10 font-[family-name:var(--font-geist-sans)]">
      <div className="min-w-48 max-w-96 pt-20">
        <ExchangeRateDisplay />
      </div>
      <div className="min-w-48 max-w-96 w-full">
        <CurrencyTransactionForm />
      </div>
    </div>
  );
}
