import { Transform } from "class-transformer"
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class CreateDoctorDto {
    
    @IsUrl()
    @IsString()
    @IsOptional()
    profilePic : string
    
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
    degreeName:string

    @IsString()
    @IsNotEmpty()
    degreeInstitute:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    specializationId:string

    @IsNumber()
    @IsNotEmpty()
    totalExperience : number

    @IsNumber()
    @IsOptional()
    doctorFee:number

}
