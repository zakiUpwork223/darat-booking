import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class CreateFeedbackDto {
    @IsString()
    @IsNotEmpty()
    appointment : string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    review : number
}
