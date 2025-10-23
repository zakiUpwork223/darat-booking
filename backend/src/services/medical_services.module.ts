import { Module } from '@nestjs/common';
import { MedicalServicesService } from './medical_services.service';
import { MedicalServicesController } from './medical_services.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [MedicalServicesController],
  providers: [MedicalServicesService],
  exports:[MedicalServicesService]
})
export class ServicesModule {}
