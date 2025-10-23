import { Transform } from "class-transformer"
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator"
import { Role } from "src/roleGuard/role.enum"

export class LogInDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    username: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\s]).{8,}$/, {
        message: 'Invalid Password: Password should have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 digit, and should have more than 8 characters'
    })
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role
}