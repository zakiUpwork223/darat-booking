import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateAdminDto {

    @IsString()
    @IsUrl()
    @IsOptional()
    profilePic: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @IsString()
    @IsOptional()
    contactNumber: string

    @IsString()
    @IsNotEmpty()
    password: string


}
