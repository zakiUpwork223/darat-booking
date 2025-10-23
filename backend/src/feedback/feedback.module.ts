import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports:[PrismaModule, AppointmentModule , DoctorModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
