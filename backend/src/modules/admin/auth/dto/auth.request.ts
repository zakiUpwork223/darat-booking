// import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// export class RegisterDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     type: String,
//     required: false,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsOptional()
//   password: string;

//   @ApiProperty({
//     type: String,
//     required: false,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsOptional()
//   phone: string;

//   @ApiProperty({
//     type: String,
//     required: false,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsOptional()
//   avatar: string;

//   @ApiProperty({
//     type: String,
//     required: false,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsOptional()
//   address: string;

//   @ApiProperty({
//     type: String,
//     required: false,
//     description: 'This is a required property',
//   })
//   @IsOptional()
//   dateOfBirth: string | Date;
// }

// export class LoginDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   password: string;
// }

// export class VerifyAccountDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   otp: string;
// }

// export class forgotPasswordDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   email: string;
// }

// export class ChangePasswordDto {
//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({
//     type: String,
//     required: true,
//     description: 'This is a required property',
//   })
//   @IsString()
//   @IsNotEmpty()
//   password: string;
// }
