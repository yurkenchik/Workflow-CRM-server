
export class ValueObject<T> {
    protected readonly value: T;

    constructor(value: T) {
        this.value = Object.freeze(value);
    }

    public equals(other?: ValueObject<T>): boolean {
        if (!other) {
            return false;
        }

        if (this.constructor !== other.constructor) {
            return false;
        }

        return JSON.stringify(this.value) === JSON.stringify(other.value);
    }

    getValue(): T {
        return this.value;
    }
}