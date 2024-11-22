import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "src/authorization/infrastructure/commands/login/login.command";
import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { User } from "src/authorization/domain/entities/user.entity";

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    constructor(public readonly authorizationService: AuthorizationService) {}

    execute(command: LoginCommand): Promise<User> {
        return this.authorizationService.login(command.loginDto);
    }
}