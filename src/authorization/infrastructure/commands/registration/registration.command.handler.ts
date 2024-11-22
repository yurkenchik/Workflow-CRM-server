import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import { RegistrationCommand } from "src/authorization/infrastructure/commands/registration/registration.command";
import {AuthorizationService} from "src/authorization/infrastructure/services/authorization.service";
import { User } from "src/authorization/domain/entities/user.entity";

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler implements ICommandHandler<RegistrationCommand> {
    constructor(private readonly authorizationService: AuthorizationService) {}

    execute(command: RegistrationCommand): Promise<User> {
        return this.authorizationService.registration(command.createUserDto);
    }
}