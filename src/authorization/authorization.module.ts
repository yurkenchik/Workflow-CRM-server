import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { TokenService } from "src/authorization/infrastructure/services/token.service";
import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { ConfirmationCodeService } from "src/authorization/infrastructure/services/confirmation-code.service";
import { ServiceDetailsService } from "src/authorization/infrastructure/services/service-details.service";

import { ConfirmationCode } from "src/authorization/domain/entities/confirmation-code.entity";
import { User } from "src/authorization/domain/entities/user.entity";
import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";

import { AuthorizationController } from "src/authorization/presentation/authorization.controller";
import { ServiceDetailsController } from "src/authorization/presentation/service-details.controller";

import { MessagingModule } from "src/messaging/modules/messaging.module";
import {
    RegistrationCommandHandler
} from "src/authorization/infrastructure/commands/registration/registration.command.handler";
import { LoginCommandHandler } from "src/authorization/infrastructure/commands/login/login.command.handler";
import { LogOutCommandHandler } from "src/authorization/infrastructure/commands/log-out/log-out.command.handler";
import {
    ConfirmRegistrationCommandHandler
} from "src/authorization/infrastructure/commands/confirm-registration/confirm-registration.command.handler";
import {
    ConfirmLoginCommandHandler
} from "src/authorization/infrastructure/commands/confirm-login/confirm-login.command.handler";
import {
    CreateServiceDetailsCommandHandler
} from "src/authorization/infrastructure/commands/create-service-details/create-service.details.command.handler";

@Module({
    providers: [
        AuthorizationService,
        TokenService,
        ConfirmationCodeService,
        AuthorizationUserService,
        ServiceDetailsService,

        RegistrationCommandHandler,
        LoginCommandHandler,
        LogOutCommandHandler,
        ConfirmRegistrationCommandHandler,
        ConfirmLoginCommandHandler,
        CreateServiceDetailsCommandHandler
    ],
    controllers: [AuthorizationController, ServiceDetailsController],
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({ entities: [User, ConfirmationCode, ServiceDetails] }),
        JwtModule,
        CqrsModule,
        MessagingModule,
    ],
    exports: [
        AuthorizationUserService,
        AuthorizationService,
        ConfirmationCodeService,
    ],
})
export class AuthorizationModule {}