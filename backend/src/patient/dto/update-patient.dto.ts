import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePatientDto {
    @IsOptional()
    @IsString()
    @IsUrl()
    profilePic: string
    
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    @IsOptional()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Matches(/^\+?\d{10,15}$/, { message: 'Invalid Phone Number : Phone Number should be of format +923001234567, 03001234567 and between 10-15 Digits' })
    contactNumber: string

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    medicalHistory: string[]
}
