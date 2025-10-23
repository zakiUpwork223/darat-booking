import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PatientService } from 'src/patient/patient.service';
import { PatientModule } from 'src/patient/patient.module';
import { AdminModule } from 'src/admin/admin.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VerifyService } from 'src/utils/verify.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports:[JwtModule, PrismaModule ,PatientModule , AdminModule,DoctorModule , MailerModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy , VerifyService],
  exports:[AuthService]
})
export class AuthModule {}
