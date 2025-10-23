import { Module } from '@nestjs/common';
import { CustomerPaymentsService } from './customer_payments.service';
import { CustomerPaymentsController } from './customer_payments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CustomerPaymentsController],
  providers: [CustomerPaymentsService],
  exports:[CustomerPaymentsService]
})
export class CustomerPaymentsModule {}
