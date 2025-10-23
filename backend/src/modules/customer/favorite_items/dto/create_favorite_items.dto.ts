import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class FavoriteItemDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  variantId: string;
}
