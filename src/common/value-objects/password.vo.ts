import {ValueObject} from "../instances/value-object";
import {InvalidPasswordException} from "../exceptions/400-client/400/invalid-password.exception";
import * as bcrypt from "bcrypt";

export class Password extends ValueObject<string>{
    constructor(public readonly password: string) {
        if (!Password.validatePassword(password)) {
            throw new InvalidPasswordException();
        }
        super(password);
    }

    private static validatePassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    async hash(): Promise<string> {
        return bcrypt.hash(this.value, 5);
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