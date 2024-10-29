
export class UserId {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValidOrderId(value)) {
            throw new Error('Invalid Order ID');
        }
        this.value = value;
    }

    private isValidOrderId(value: string): boolean {
        return /^[A-Z0-9]{8}$/.test(value);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: UserId): boolean {
        return this.value === other.getValue();
    }
}