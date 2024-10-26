import {Type} from "class-transformer";
import {Email} from "../../../domain/value-objects/email/email";
import {IsNotEmpty, IsString, Max, Min} from "class-validator";

export class ValidateUserDto {
    @Type(() => Email)
    readonly email: Email;

    @IsNotEmpty()
    @IsString()
    @Min(10)
    @Max(100)
    readonly password: string;
}