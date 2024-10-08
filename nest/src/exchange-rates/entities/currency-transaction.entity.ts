import { Exclude, Expose, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrencyTransaction {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 100, scale: 2 })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)), {
    toPlainOnly: true,
  })
  amountEUR: number;

  @Column({ type: 'decimal', precision: 100, scale: 2 })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)), {
    toPlainOnly: true,
  })
  amountPLN: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)), {
    toPlainOnly: true,
  })
  rate: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
