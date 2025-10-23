import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CartDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  variant_id: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  category_id: string;
  
}

export class RemoveCartItemDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  variant_id: string;
}

export class CustomerCartDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  // @ApiProperty({
  //   type: String,
  //   required: true,
  //   description: 'This is a required property',
  // })
  // @IsString()
  // @IsOptional()
  // category_id: string;
  
}
