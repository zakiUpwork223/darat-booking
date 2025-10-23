import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { VerifyService } from 'src/utils/verify.service';

@Module({
  imports:[PrismaModule, MailerModule],
  controllers: [PatientController],
  providers: [PatientService, VerifyService],
  exports: [PatientService],
})
export class PatientModule {}
