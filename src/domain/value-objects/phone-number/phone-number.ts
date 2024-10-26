import {ValueObject} from "../value-object";
import {PhoneNumberInterface, PhoneNumberValue} from "./phone-number.interface";
import {PhoneNumberDto} from "./phone-number.dto";
import {validateSync} from "class-validator";
import {InvalidPhoneNumberException} from "../../../common/exceptions/invalid-phone-number.exception";

export class PhoneNumber extends ValueObject<PhoneNumberValue> implements PhoneNumberInterface {
    constructor(phoneNumber: string) {
        if (!PhoneNumber.validatePhoneNumber(phoneNumber)) {
            throw new InvalidPhoneNumberException();
        }
        super({ phoneNumber });
    }

    private static validatePhoneNumber(phoneNumber: string) {
        const phoneNumberValidationObj = new PhoneNumberDto(phoneNumber);
        const errors = validateSync(phoneNumberValidationObj);
        return errors.length === 0;
    }

    getPhoneNumber(): string {
        return this.value.phoneNumber;
    }

    equals(other?: PhoneNumber): boolean {
        if (!other) {
            return false;
        }
        return other.value.phoneNumber === this.value.phoneNumber;
    }
}