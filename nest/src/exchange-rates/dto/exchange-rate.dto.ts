import { IsNumber, Min } from 'class-validator';

export class ExchangeRateDto {
  @IsNumber()
  exchange_rate: number;
}
