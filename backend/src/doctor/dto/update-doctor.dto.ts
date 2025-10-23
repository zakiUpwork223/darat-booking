import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class UpdateDoctorDto{
    @IsUrl()
    @IsString()
    @IsOptional()
    profilePic : string
    
    @IsString()
    @IsNotEmpty()
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
    contactNumber: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    degreeName:string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    degreeInstitute:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    specializationId:string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    totalExperience : number

    @IsNumber()
    @IsOptional()
    doctorFee:number
}


