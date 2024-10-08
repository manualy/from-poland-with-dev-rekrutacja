import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCurrencyTransactionDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amountEUR: number;
}
