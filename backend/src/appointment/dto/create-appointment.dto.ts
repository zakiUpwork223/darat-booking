import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateAppointmentDto {
    
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    doctorId:string
    
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    serviceId:string
   
    @IsNotEmpty()
    scheduldedDate :Date

}