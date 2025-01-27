import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity('payment_statuses')
export class PaymentStatus {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the payment status',
  })
  id: number;

  @Column({ nullable: true, unique: true })
  @ApiProperty({
    example: 'Paid',
    description: 'The name of the payment status',
  })
  name: string;

  @OneToMany(() => Payment, (payment) => payment.status)
  @ApiProperty({
    type: () => [Payment],
    description: 'The payments associated with this status',
  })
  payments: Payment[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Creation date of the user',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Last update date of the user',
  })
  updatedAt: Date;
}
