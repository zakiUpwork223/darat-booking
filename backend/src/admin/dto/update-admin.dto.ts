import { Transform } from "class-transformer"
import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator"

export class UpdateAdminDto {
    @IsString()
    @IsUrl()
    @IsOptional()
    profilePic:string

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsEmail({}, { message: 'Invalid Email' })
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @IsString()
    @IsOptional()
    contactNumber: string
}
