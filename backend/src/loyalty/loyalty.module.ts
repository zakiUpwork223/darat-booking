import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
//import { PaymentModule } from 'src/payment/payment.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports:[PrismaModule  , PatientModule],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports:[LoyaltyService]
})
export class LoyaltyModule {}
