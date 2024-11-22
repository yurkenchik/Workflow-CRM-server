import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ConfirmLoginCommand } from "src/authorization/infrastructure/commands/confirm-login/confirm-login.command";
import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { AuthorizationResponseDto } from "src/authorization/domain/dto/authorization-response.dto";

@CommandHandler(ConfirmLoginCommand)
export class ConfirmLoginCommandHandler implements ICommandHandler<ConfirmLoginCommand> {
    constructor(private readonly authorizationService: AuthorizationService) {}

    execute(command: ConfirmLoginCommand): Promise<AuthorizationResponseDto> {
        return this.authorizationService.confirmLogin(command.confirmAuthorizationDto);
    }
}