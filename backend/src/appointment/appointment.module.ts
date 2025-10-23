import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DrScheduleModule } from 'src/schedule/dr_schedule.module';
import { LoyaltyModule } from 'src/loyalty/loyalty.module';
import { SocketsModule } from 'src/sockets/sockets.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports:[PrismaModule, DrScheduleModule  , LoyaltyModule , SocketsModule , MailerModule] ,
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports:[AppointmentService]
})
export class AppointmentModule {}
