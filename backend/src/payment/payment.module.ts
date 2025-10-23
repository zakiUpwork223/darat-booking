import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PatientModule } from 'src/patient/patient.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketsModule } from 'src/sockets/sockets.module';
import { CustomerPaymentsModule } from 'src/customer_payments/customer_payments.module';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { LoyaltyModule } from 'src/loyalty/loyalty.module';

@Module({
  imports:[PatientModule , PrismaModule , SocketsModule, CustomerPaymentsModule , AppointmentModule , LoyaltyModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports:[PaymentService]
})
export class PaymentModule {}
