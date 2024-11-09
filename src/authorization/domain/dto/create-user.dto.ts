
export class CreateUserDto {
    readonly email: string;
    readonly phoneNumber: string;
    readonly confirmationCode: string;
    readonly password: string;
}