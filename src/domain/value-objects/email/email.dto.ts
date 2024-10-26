import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}