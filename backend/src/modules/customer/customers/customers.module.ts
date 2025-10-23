import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { GoogleMapsAPIService } from 'src/common/services/google-map.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomersController } from './customers.controller';


@Module({
  imports: [
   PrismaModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService, GoogleMapsAPIService],
})
export class CustomersModule {}
