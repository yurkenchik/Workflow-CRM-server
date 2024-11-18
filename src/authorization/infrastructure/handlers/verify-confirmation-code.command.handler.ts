import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    VerifyConfirmationCodeCommand
} from "src/authorization/infrastructure/handlers/commands/verify-confirmation-code.command";
import { ConfirmationCodeService } from "src/authorization/infrastructure/services/confirmation-code.service";

@CommandHandler(VerifyConfirmationCodeCommand)
export class VerifyConfirmationCodeCommandHandler
    implements ICommandHandler<VerifyConfirmationCodeCommand>
{
    constructor(private readonly confirmationCodeService: ConfirmationCodeService) {}

    execute(command: VerifyConfirmationCodeCommand): Promise<void> {
        return this.confirmationCodeService.verifyConfirmationCode(command.value);
    }
}