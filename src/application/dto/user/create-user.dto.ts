import {IsNotEmpty, IsString} from "class-validator";
import {PhoneNumber} from "../../../domain/value-objects/phone-number/phone-number";

export class CreateUserDto {
    @IsString()
    readonly username: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    readonly companyName: string;
}