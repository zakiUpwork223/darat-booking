import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DiscountDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsOptional()
  expiryDate: string | Date;

  @ApiProperty({
    type: Array,
    required: true,
    description: 'This is a required property',
  })
  @IsArray()
  @IsNotEmpty({ message: 'Items or categories should not be empty' })
  data: string[];
}
