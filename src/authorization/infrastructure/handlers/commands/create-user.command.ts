import {CreateUserDto} from "src/authorization/domain/dto/create-user.dto";

export class CreateUserCommand extends CreateUserDto {
    constructor(createUserDto: CreateUserDto) {
        super();
        Object.assign(this, createUserDto);
    }
}