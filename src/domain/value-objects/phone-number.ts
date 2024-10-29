import {ValueObject} from "./value-object";
import {InvalidPhoneNumberException} from "../../common/exceptions/invalid-phone-number.exception";

export class PhoneNumber extends ValueObject<string> {
    constructor(phoneNumber: string) {
        if (!PhoneNumber.validatePhoneNumber(phoneNumber)) {
            throw new InvalidPhoneNumberException();
        }
        super(phoneNumber);
    }

    private static validatePhoneNumber(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    getValue(): string {
        return this.value;
    }

    equals(other?: PhoneNumber): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}