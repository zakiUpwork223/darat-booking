import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class BookedAppointmentDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    doctorId:string

    @IsNotEmpty()
    dateSelected:Date
}
