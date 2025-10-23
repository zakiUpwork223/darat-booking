import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

import { GoogleMapsAPIService } from 'src/common/services/google-map.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
   PrismaModule
  ],
  controllers: [CartController],
  providers: [CartService, GoogleMapsAPIService],
})
export class CartModule {}
