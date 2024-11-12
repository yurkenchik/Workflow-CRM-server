import {ValueObject} from "../instances/value-object";
import {InvalidEmailException} from "../exceptions/400-client/400/invalid-email.exception";
import * as bcrypt from "bcrypt";

export class Password extends ValueObject<string>{
    constructor(public readonly password: string) {
        if (!Password.validatePassword(password)) {
            throw new InvalidEmailException();
        }
        super(password);
    }

    private static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    getValue(): string {
        return this.value;
    }

    comparePasswords(password: string): boolean {
        return bcrypt.compare(password, this.password);
    }

    equals(other: Password): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}