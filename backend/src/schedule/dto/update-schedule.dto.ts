import { IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class UpdateScheduleDto {
    // @IsString()
    // @IsNotEmpty()
    // @IsUUID()
    // doctorId: string;

    // @IsString()
    // @IsNotEmpty()
    // @IsUUID()
    // serviceId: string;

    // @IsString()
    // @IsNotEmpty() // use enum?
    // weekday: string;

    //@IsString()
    @IsNotEmpty()
    startTime: Date;

    //@IsString()
    @IsNotEmpty()
    endTime: Date;

    @IsNumber()
    @IsNotEmpty()
    @Min(15)
    @Max(60)
    slotDuration: number;
}
