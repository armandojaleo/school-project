import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { ExtracurricularActivity } from 'src/extracurricular-activities/entities/extracurricular-activity.entity';
import { PaymentStatus } from 'src/payment-statuses/entities/payment-status.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the payment',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    type: () => User,
    description: 'The user who made the payment',
  })
  user: User;

  @ManyToOne(() => ExtracurricularActivity, (activity) => activity.payments)
  @JoinColumn({ name: 'activity_id' })
  @ApiProperty({
    type: () => ExtracurricularActivity,
    description: 'The activity the payment is for',
  })
  activity: ExtracurricularActivity;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  @ApiProperty({
    example: '2024-06-01',
    description: 'The date the payment was made',
  })
  paymentDate: Date;

  @Column({ type: 'numeric', nullable: true })
  @ApiProperty({ example: 100.0, description: 'The amount of the payment' })
  amount: number;

  @ManyToOne(() => PaymentStatus, (status) => status.payments)
  @JoinColumn({ name: 'payment_status_id' })
  @ApiProperty({
    type: () => PaymentStatus,
    description: 'The status of the payment',
  })
  status: PaymentStatus;

  @Column({ name: 'transaction_id', nullable: true })
  @ApiProperty({
    example: 'abc123',
    description: 'The transaction ID for the payment',
  })
  transactionId: string;

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
