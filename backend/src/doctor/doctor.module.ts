import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { VerifyService } from 'src/utils/verify.service';
import { PatientModule } from 'src/patient/patient.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports:[PrismaModule , MailerModule  , PatientModule , AdminModule],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports:[DoctorService]
})
export class DoctorModule {}
