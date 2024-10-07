import { IsDecimal, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCurrencyTransactionDto {
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  @IsPositive()
  amountEUR: number;
}
