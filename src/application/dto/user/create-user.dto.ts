import {IsNotEmpty, IsString} from "class-validator";
import {Type} from "class-transformer";
import {Email} from "../../../domain/value-objects/email/email";
import {PhoneNumber} from "../../../domain/value-objects/phone-number/phone-number";

export class CreateUserDto {
    @IsString()
    username: string;

    @Type(() => Email)
    email: Email;

    @Type(() => PhoneNumber)
    phoneNumber: PhoneNumber;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    companyName: string;
}