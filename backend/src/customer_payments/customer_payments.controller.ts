import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CustomerPaymentsService } from './customer_payments.service';
import { CreateCustomerPaymentDto } from './dto/create-customer_payment.dto';
import { UpdateCustomerPaymentDto } from './dto/update-customer_payment.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('customer-payments')
export class CustomerPaymentsController {
  constructor(private readonly customerPaymentsService: CustomerPaymentsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCustomerPaymentDto: CreateCustomerPaymentDto , @Req() req) {
    return this.customerPaymentsService.createAppointmentReceipt(createCustomerPaymentDto );
  }

  @Get()
  findAll() {
    return this.customerPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerPaymentsService.findOneByStripeId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerPaymentDto: UpdateCustomerPaymentDto) {
    return this.customerPaymentsService.update(+id, updateCustomerPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerPaymentsService.remove(+id);
  }
}
