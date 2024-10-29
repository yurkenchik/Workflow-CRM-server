import {ValueObject} from "./value-object";
import * as bcrypt from "bcrypt";

export class RefreshToken  extends ValueObject<string> {
    constructor(refreshToken: string) {
        super(refreshToken);
    }

    getValue(): string {
        return this.value;
    }

    async compareRefreshTokens(refreshToken: string): Promise<boolean> {
        return bcrypt.compare(this.value, refreshToken);
    }

    equals(other?: RefreshToken): boolean {
        if (!other) {
            return false;
        }
        return other.value === this.value;
    }
}