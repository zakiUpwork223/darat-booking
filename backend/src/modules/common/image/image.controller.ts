import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file): Promise<{ url: string }> {
    const imageStream = file.buffer;
    return this.imageService.uploadFile(imageStream);
  }

  @Get(':public_id')
  @UseInterceptors(FileInterceptor('image'))
  fetchImage(@Param('public_id') public_id: string) {
    return this.imageService.fetchImage(public_id);
  }
}
