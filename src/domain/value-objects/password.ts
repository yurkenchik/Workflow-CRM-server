import {ValueObject} from "./value-object";
import {InvalidPhoneNumberException} from "../../common/exceptions/invalid-phone-number.exception";
import * as bcrypt from "bcrypt";

export class Password extends ValueObject<string> {
    constructor(phoneNumber: string) {
        if (!Password.validatePassword(phoneNumber)) {
            throw new InvalidPhoneNumberException();
        }
        super(phoneNumber);
    }

    private static validatePassword(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    async comparePasswords(hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(this.value, hashedPassword);
    }
    getValue(): string {
        return this.value;
    }

    equals(other?: Password): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}