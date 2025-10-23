import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FavoriteItemsController } from './favorite_items.controller';
import { FavoriteItemsService } from './favorite_items.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavoriteItemsController],
  providers: [FavoriteItemsService],
})
export class FavoriteItemsModule {}
