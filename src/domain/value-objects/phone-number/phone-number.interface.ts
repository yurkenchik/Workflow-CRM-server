import {PhoneNumber} from "./phone-number";

export interface PhoneNumberInterface {
    getPhoneNumber(): string;
    equals(phoneNumber: PhoneNumber): boolean;
}

export interface PhoneNumberValue {
    phoneNumber: string;
}