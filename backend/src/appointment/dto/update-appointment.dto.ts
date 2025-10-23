import { IsNotEmpty } from "class-validator";

export class UpdateAppointmentDto {   
    @IsNotEmpty()
    scheduldedDate :Date

}
