import { Weekdays } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateScheduleDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    doctorId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    serviceId: string;

    // @IsEnum(Weekdays)
    // @IsString()
    // @IsNotEmpty() // use enum?
    // weekday: Weekdays;

    @IsNotEmpty()
    scheduleDate: Date;

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
