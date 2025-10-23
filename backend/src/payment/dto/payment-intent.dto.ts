import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class PaymentIntentDto {
    @IsNumber()
    amount: number
    @IsString()
    currency: string
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    doctorId: string
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    serviceId: string

    @IsNotEmpty()
    scheduldedDate: Date
}
