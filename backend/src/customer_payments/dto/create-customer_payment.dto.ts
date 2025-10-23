import { InvoiceType } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class CreateCustomerPaymentDto {
    @IsString()
    stripeId: string

    @IsString()
    client_secret: string

    @IsString()
    paymentAmount: number

    @IsEnum(InvoiceType)
    type: InvoiceType

    @IsString()
    @IsUUID()
    appointmentId:string
}
