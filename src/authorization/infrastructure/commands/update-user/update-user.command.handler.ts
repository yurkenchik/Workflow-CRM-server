import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import { UpdateUserCommand } from "src/authorization/infrastructure/commands/update-user/update-user.command";
import {AuthorizationUserService} from "src/authorization/infrastructure/services/authorization-user.service";
import {User} from "src/authorization/domain/entities/user.entity";

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userService: AuthorizationUserService) {}

    execute(command: UpdateUserCommand): Promise<User> {
        const { userId, updateUserDto } = command;

        return this.userService.updateUser(userId, updateUserDto);
    }
}
