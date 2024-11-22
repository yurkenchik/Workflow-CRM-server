import {CreateUserDto} from "src/authorization/domain/dto/create-user.dto";

export class RegistrationCommand {
    constructor(public readonly createUserDto: CreateUserDto) {}
}