import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class OrderDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;

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
  totalPrice: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a required property',
  })
  @IsString()
  @IsOptional()
  stripeToken: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  items: OrderItemsDto[];
}

export class OrderItemsDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  variantId: string;

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
    required: false,
    description: 'This is a required property',
  })
  @IsNumber()
  @IsOptional()
  discount: number;
}
