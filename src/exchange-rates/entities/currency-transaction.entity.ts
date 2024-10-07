import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrencyTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 1000, scale: 2 })
  amountEUR: number;

  @Column({ type: 'decimal', precision: 1000, scale: 2 })
  amountPLN: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
