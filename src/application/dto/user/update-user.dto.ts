import {IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {Email} from "../../../domain/value-objects/email/email";
import {PhoneNumber} from "../../../domain/value-objects/phone-number/phone-number";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly username: string;

    @IsOptional()
    @Transform(({ value }) => new Email(value))
    readonly email: Email;

    @Transform(({ value }) => new Email(value))
    phoneNumber: PhoneNumber;

    @IsString()
    @IsOptional()
    readonly password: string;

    @IsOptional()
    refreshToken: string;

    @IsString()
    @IsOptional()
    readonly companyName: string;
}