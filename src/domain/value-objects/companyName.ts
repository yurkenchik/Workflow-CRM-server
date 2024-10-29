import {ValueObject} from "./value-object";

export class CompanyName extends ValueObject<string> {
    constructor(companyName: string) {
        super(companyName);
    }

    getValue(): string {
        return this.value;
    }

    equals(other?: CompanyName): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}