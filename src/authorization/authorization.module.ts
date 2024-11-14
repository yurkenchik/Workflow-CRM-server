import {Module} from "@nestjs/common";
import {AuthorizationUserService} from "./infrastrcuture/services/authorization-user.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "./domain/entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TokenService} from "./infrastrcuture/services/token.service";
import {AuthorizationController} from "./presentation/authorization.controller";
import {AuthorizationService} from "./infrastrcuture/services/authorization.service";
import {CqrsModule} from "@nestjs/cqrs";
import {SendVerificationCodeHandler} from "../messaging/infrastructure/handlers/send-verification-code.handler";
import {EmailModule} from "../messaging/modules/email.module";
import {ConfirmationCodeService} from "./infrastrcuture/services/confirmation-code.service";
import {ConfirmationCode} from "./domain/entities/confirmation-code.entity";

@Module({
    providers: [
        AuthorizationService,
        TokenService,
        AuthorizationUserService,
        SendVerificationCodeHandler,
        ConfirmationCodeService,
    ],
    controllers: [AuthorizationController],
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({ entities: [User, ConfirmationCode] }),
        JwtModule,
        CqrsModule,
        EmailModule
    ],
    exports: [AuthorizationUserService],
})
export class AuthorizationModule {}