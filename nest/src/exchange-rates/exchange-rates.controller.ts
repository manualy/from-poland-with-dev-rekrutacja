import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { CreateCurrencyTransactionDto } from './dto/currency-transaction.dto';

@Controller('exchange')
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get('current-rate')
  getCurrentExchangeRate(): Promise<ExchangeRateDto> {
    return this.exchangeRatesService.getCurrentExchangeRate();
  }

  @Post('currency-transaction')
  async addCurrencyTransaction(
    @Body() createCurrencyTransactionDto: CreateCurrencyTransactionDto,
  ): Promise<any> {
    return this.exchangeRatesService.saveTransaction(
      createCurrencyTransactionDto,
    );
  }
}
