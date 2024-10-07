import { IsNumber, Min } from 'class-validator';

export class ExchangeRateDto {
  @IsNumber()
  @Min(0.01, { message: 'Rate must be greater than 0' })
  exchange_rate: number;
}
