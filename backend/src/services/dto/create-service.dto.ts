import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a required property',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  picture: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsOptional()
  serviceFee: number;
}
