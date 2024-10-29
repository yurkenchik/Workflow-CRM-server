import {ValueObject} from "./value-object";
import {InvalidEmailException} from "../../common/exceptions/invalid-email.exception";

export class Email extends ValueObject<string> {
    constructor(email: string) {
        if (!Email.validateEmail(email)) {
            throw new InvalidEmailException();
        }
        super(email);
    }

    private static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}