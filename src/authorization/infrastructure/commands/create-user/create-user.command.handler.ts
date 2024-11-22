import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import { CreateUserCommand } from "src/authorization/infrastructure/commands/create-user/create-user.command";
import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import {User} from "src/authorization/domain/entities/user.entity";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userService: AuthorizationUserService) {}

    async execute(command: CreateUserCommand): Promise<User> {
        return this.userService.createUser(command.createUserDto);
    }
}