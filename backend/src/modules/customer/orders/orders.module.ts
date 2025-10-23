import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StripeService } from 'src/common/services/stripe.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  controllers: [OrdersController],
  providers: [OrdersService, StripeService],
})
export class OrdersModule {}
