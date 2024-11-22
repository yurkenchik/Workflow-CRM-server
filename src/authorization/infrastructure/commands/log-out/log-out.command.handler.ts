import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LogOutCommand } from "src/authorization/infrastructure/commands/log-out/log-out.command";
import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";

@CommandHandler(LogOutCommand)
export class LogOutCommandHandler implements ICommandHandler<LogOutCommand> {
    constructor(private readonly authorizationService: AuthorizationService) {}

    execute(command: LogOutCommand): Promise<void> {
        return this.authorizationService.logout(command.userId);
    }
}