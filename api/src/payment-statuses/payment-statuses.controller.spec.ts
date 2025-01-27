import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStatusesController } from './payment-statuses.controller';
import { PaymentStatusesService } from './payment-statuses.service';

describe('PaymentStatusesController', () => {
  let controller: PaymentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStatusesController],
      providers: [PaymentStatusesService],
    }).compile();

    controller = module.get<PaymentStatusesController>(PaymentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
