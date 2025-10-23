import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoyaltyDto {
    @IsString()
    @IsNotEmpty()
    client_secret : string
}
