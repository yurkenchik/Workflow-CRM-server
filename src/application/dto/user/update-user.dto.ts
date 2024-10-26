import {IsNotEmpty, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Email} from "../../../domain/value-objects/email/email";
import {PhoneNumber} from "../../../domain/value-objects/phone-number/phone-number";

export class UpdateUserDto {
    @IsString()
    readonly username: string;

    @Type(() => Email)
    readonly email: Email;

    @Type(() => PhoneNumber)
    phoneNumber: PhoneNumber;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    readonly companyName: string;
}