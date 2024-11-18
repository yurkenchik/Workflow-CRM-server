import {UpdateUserDto} from "src/authorization/domain/dto/update-user.dto";

export class UpdateUserCommand extends UpdateUserDto {
    constructor(
        private readonly userId: string,
        private readonly updateUserCommand: UpdateUserCommand
    ) {
        super();
    }
}