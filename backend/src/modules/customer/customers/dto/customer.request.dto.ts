import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CustomerDto {
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
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a required property',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a required property',
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a required property',
  })
  @IsOptional()
  dateOfBirth: string | Date;
}

export class CustomerLoginDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CustomerAddressDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  lng: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsString()
  @IsOptional()
  address: string;
}

export class CustomerResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly token?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    token?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.token = token;
  }}

