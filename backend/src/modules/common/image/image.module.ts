import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';
import { ImageController } from './image.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ImageController],
  exports: [CloudinaryProvider, ImageService],
  providers: [CloudinaryProvider, ImageService],
})
export class ImageModule {}
