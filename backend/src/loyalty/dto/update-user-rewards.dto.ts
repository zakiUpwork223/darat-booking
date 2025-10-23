import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"

class BirthdayDto {
    @IsInt()
    freeMask: number;

    @IsInt()
    freeFacial: number;
}

class FreeGiftDto {
    @IsInt()
    cream: number;

    @IsInt()
    sunblock: number;

    @IsInt()
    maskSheet: number;
}

class FreeServicesDto {
    @IsInt()
    bodyLaser: number;

    @IsInt()
    teethCleaning: number;

    @IsInt()
    cooltechSession: number;
}
export class UpdateUserRewardsDto {

    @IsEmail()
    patientEmail : string

    @ValidateNested()
    birthday: BirthdayDto;

    @ValidateNested()
    freeGift: FreeGiftDto;

    @IsInt()
    consultation: number;

    @IsInt()
    serviceDiscount: number;

    @ValidateNested()
    @IsObject()
    freeServices: FreeServicesDto;

}
