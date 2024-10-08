import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    ExchangeRatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
