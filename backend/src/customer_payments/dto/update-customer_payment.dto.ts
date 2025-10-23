import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerPaymentDto } from './create-customer_payment.dto';

export class UpdateCustomerPaymentDto extends PartialType(CreateCustomerPaymentDto) {}
