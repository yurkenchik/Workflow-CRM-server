import { LoginDto } from "src/authorization/domain/dto/login.dto";

export class LoginCommand {
    constructor(public readonly loginDto: LoginDto) {}
}