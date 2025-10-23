import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ItemDto {
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
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  variants: any;
}

export class ItemVariantDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  unique_code: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  item_id: string;

  @ApiProperty({
    // type: String,
    // required: false,
    description: 'This is a optional property',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemColorDto)
  colors: ItemColorDto[];
}

export class ItemColorDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    type: Number,
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
  unique_code: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  item_variant_id: string;
}
