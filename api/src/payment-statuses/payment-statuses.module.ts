import { Module } from '@nestjs/common';
import { PaymentStatusesService } from './payment-statuses.service';
import { PaymentStatusesController } from './payment-statuses.controller';

@Module({
  controllers: [PaymentStatusesController],
  providers: [PaymentStatusesService],
})
export class PaymentStatusesModule {}
