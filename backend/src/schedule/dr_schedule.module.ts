import { Module } from '@nestjs/common';
import { ScheduleService } from './dr_schedule.service';
import { ScheduleController } from './dr_schedule.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { ServicesModule } from 'src/services/medical_services.module';

@Module({
  imports:[PrismaModule, MailerModule , DoctorModule, ServicesModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class DrScheduleModule {}
