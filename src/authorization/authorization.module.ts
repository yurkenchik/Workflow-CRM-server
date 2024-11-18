import { Module } from "@nestjs/common";
import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { TokenService } from "src/authorization/infrastructure/services/token.service";
import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { SendVerificationCodeHandler } from "src/messaging/infrastructure/handlers/send-verification-code.handler";
import { ConfirmationCodeService } from "src/authorization/infrastructure/services/confirmation-code.service";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ConfirmationCode } from "src/authorization/domain/entities/confirmation-code.entity";
import { User } from "src/authorization/domain/entities/user.entity";
import { AuthorizationController } from "src/authorization/presentation/authorization.controller";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { EmailModule } from "src/messaging/modules/email.module";

@Module({
    providers: [
        AuthorizationService,
        TokenService,
        ConfirmationCodeService,
        SendVerificationCodeHandler,
        AuthorizationUserService
    ],
    controllers: [AuthorizationController],
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({ entities: [User, ConfirmationCode] }),
        JwtModule,
        CqrsModule,
        EmailModule
    ],
    exports: [
        AuthorizationUserService,
        AuthorizationService,
        ConfirmationCodeService,
    ],
})
export class AuthorizationModule {}