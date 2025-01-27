import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentStatusesService } from './payment-statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment-statuses')
@Controller('payment-statuses')
export class PaymentStatusesController {
  constructor(
    private readonly paymentStatusesService: PaymentStatusesService,
  ) {}

  @Post()
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusesService.create(createPaymentStatusDto);
  }

  @Get()
  findAll() {
    return this.paymentStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentStatusesService.update(+id, updatePaymentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentStatusesService.remove(+id);
  }
}
