import {CreateUserDto} from "src/authorization/domain/dto/create-user.dto";

export class CreateUserCommand {
    constructor(public readonly createUserDto: CreateUserDto) {}
}