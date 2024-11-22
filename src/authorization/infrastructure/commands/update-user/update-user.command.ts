import { UpdateUserDto } from "src/authorization/domain/dto/update-user.dto";

export class UpdateUserCommand {
    constructor(
        public readonly userId: string,
        public readonly updateUserDto: UpdateUserDto
    ) {}
}