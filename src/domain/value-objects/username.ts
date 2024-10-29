import {ValueObject} from "./value-object";

export class Username extends ValueObject<string> {
    constructor(phoneNumber: string) {
        super(phoneNumber);
    }

    getValue(): string {
        return this.value;
    }

    equals(other?: Username): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}