import {Email} from "./email";

export interface EmailInterface {
    getEmail(): string;
    equals(other: EmailInterface): boolean;
}

export interface EmailValue {
    email: string;
}