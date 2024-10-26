import {IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class PhoneNumberDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string;

    constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }
}