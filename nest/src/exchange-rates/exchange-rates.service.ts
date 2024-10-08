import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, retry } from 'rxjs';
import { AxiosError } from 'axios';
import { ExchangeRateDto } from './dto/exchange-rate.dto';
import { validateOrReject } from 'class-validator';
import {
  classToPlain,
  instanceToInstance,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyTransaction } from './entities/currency-transaction.entity';
import { Repository } from 'typeorm';
import { CreateCurrencyTransactionDto } from './dto/currency-transaction.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ExchangeRatesService {
  private readonly logger = new Logger(ExchangeRatesService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(CurrencyTransaction)
    private readonly currencyTransactionRepository: Repository<CurrencyTransaction>,
  ) {}

  async getCurrentExchangeRate(): Promise<ExchangeRateDto> {
    const CACHE_KEY = 'EURO_EXCHANGE_RATE';
    const cachedRate = await this.cacheManager.get<ExchangeRateDto>(CACHE_KEY);

    if (cachedRate) {
      return cachedRate;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRateDto>(this.configService.get('EXCHANGE_API_URL'), {
          headers: {
            'x-api-key': this.configService.get('API_KEY'),
          },
        })
        .pipe(
          retry(3),
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new Error("Couldn't fetch current exchange rate");
          }),
        ),
    );

    const exchangeRateDto = plainToInstance(ExchangeRateDto, data);

    try {
      await validateOrReject(exchangeRateDto);
    } catch (errors) {
      this.logger.error(
        'Invalid exchange rate data format received from the external API',
        errors,
      );
      throw new Error("Couldn't fetch current exchange rate");
    }

    await this.cacheManager.set(CACHE_KEY, exchangeRateDto, 60000);

    return data;
  }

  async saveTransaction({ amountEUR }: CreateCurrencyTransactionDto) {
    let rate: number;

    try {
      const { exchange_rate: currentExchangeRate } =
        await this.getCurrentExchangeRate();
      rate = currentExchangeRate;
    } catch {
      throw new Error("Couldn't process transaction.");
    }
    const amountPLN = parseFloat((amountEUR * rate).toFixed(2));

    try {
      const currencyTransaction = this.currencyTransactionRepository.create({
        rate,
        amountEUR,
        amountPLN,
        timestamp: new Date(),
      });

      return instanceToPlain(
        await this.currencyTransactionRepository.save(currencyTransaction),
      );
    } catch (error) {
      this.logger.error('Error saving transaction:', error.message);
      throw new BadRequestException("Couldn't process transaction.");
    }
  }
}
