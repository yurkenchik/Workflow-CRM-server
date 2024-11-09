import {IsOptional} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    readonly email: string;
    @IsOptional()
    readonly phoneNumber: string;
    @IsOptional()
    readonly confirmationCode: string;
    @IsOptional()
    readonly password: string;
}