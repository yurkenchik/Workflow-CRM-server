import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { TokenService } from "src/authorization/infrastructure/services/token.service";
import { ServiceDetailsService } from "src/authorization/infrastructure/services/service-details.service";
import {
    RegistrationCommandHandler
} from "src/authorization/infrastructure/commands/registration/registration.command.handler";
import {LoginCommandHandler} from "src/authorization/infrastructure/commands/login/login.command.handler";
import {LogOutCommandHandler} from "src/authorization/infrastructure/commands/log-out/log-out.command.handler";
import {
    ConfirmRegistrationCommandHandler
} from "src/authorization/infrastructure/commands/confirm-registration/confirm-registration.command.handler";
import {
    ConfirmLoginCommandHandler
} from "src/authorization/infrastructure/commands/confirm-login/confirm-login.command.handler";
import {
    CreateServiceDetailsCommandHandler
} from "src/authorization/infrastructure/commands/create-service-details/create-service.details.command.handler";
import {
    VerifyConfirmationCodeCommandHandler
} from "src/authorization/infrastructure/commands/verify-confirmation-code/verify-confirmation-code.command.handler";
import {
    RefreshTokenCommandHandler
} from "src/authorization/infrastructure/commands/refresh-token/refresh-token.command.handler";

export const authServices = [
    AuthorizationService,
    TokenService,
    ServiceDetailsService,
];

export const authCommandHandlers = [
    RegistrationCommandHandler,
    LoginCommandHandler,
    LogOutCommandHandler,
    ConfirmRegistrationCommandHandler,
    ConfirmLoginCommandHandler,
    CreateServiceDetailsCommandHandler,
    VerifyConfirmationCodeCommandHandler,
    RefreshTokenCommandHandler,
];
