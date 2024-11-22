import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    ConfirmRegistrationCommand
} from "src/authorization/infrastructure/commands/confirm-registration/confirm-registration.command";
import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import {AuthorizationResponseDto} from "src/authorization/domain/dto/authorization-response.dto";

@CommandHandler(ConfirmRegistrationCommand)
export class ConfirmRegistrationCommandHandler
    implements ICommandHandler<ConfirmRegistrationCommand>
{
    constructor(public readonly authorizationService: AuthorizationService) {}

    execute(command: ConfirmRegistrationCommand): Promise<AuthorizationResponseDto> {
        return this.authorizationService.confirmRegistration(command.confirmAuthorizationDto);
    }
}