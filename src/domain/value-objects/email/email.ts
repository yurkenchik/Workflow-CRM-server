import {ValueObject} from "../value-object";
import {EmailInterface, EmailValue} from "./email.interface";
import {validateSync} from "class-validator";
import {EmailDto} from "./email.dto";
import {InvalidEmailException} from "../../../common/exceptions/invalid-email.exception";

export class Email extends ValueObject<EmailValue> implements EmailInterface {
    constructor(email: string) {
        if (!Email.validateEmail(email)) {
            throw new InvalidEmailException();
        }
        super({ email });
    }

    private static validateEmail(email: string): boolean {
        const emailValidationObj = new EmailDto(email);
        const errors = validateSync(emailValidationObj);
        return errors.length === 0;
    }

    getEmail(): string {
        return this.value.email;
    }

    equals(other: Email): boolean {
        if (!other) {
            return false;
        }
        return other.value.email === this.value.email;
    }
}