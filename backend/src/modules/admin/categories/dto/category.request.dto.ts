import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
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
  attachment: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateCategoryDto {
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
    required: false,
    description: 'This is a optional property',
  })
  @IsString()
  @IsOptional()
  attachment: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsString()
  @IsOptional()
  description: string;
}
