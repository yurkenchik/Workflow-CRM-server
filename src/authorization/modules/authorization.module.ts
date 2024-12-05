import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";

import { AuthorizationService } from "src/authorization/infrastructure/services/authorization.service";
import { User } from "src/authorization/domain/entities/user.entity";
import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";

import { AuthorizationController } from "src/authorization/presentation/authorization.controller";
import { ServiceDetailsController } from "src/authorization/presentation/service-details.controller";

import { MessagingModule } from "src/messaging/modules/messaging.module";
import {UserSharedModule} from "src/authorization/modules/user-shared.module";
import { authCommandHandlers, authServices } from "src/authorization/modules/providers/authorization.providers";
import { userServices, userCommandHandlers, userQueryHandlers } from "src/authorization/modules/providers/authorization-user.providers";

@Module({
    providers: [
        ...authServices,
        ...authCommandHandlers,
        ...userServices,
        ...userCommandHandlers,
        ...userQueryHandlers
    ],
    controllers: [AuthorizationController, ServiceDetailsController],
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({ entities: [User, ServiceDetails] }),
        JwtModule,
        CqrsModule,
        MessagingModule,
        UserSharedModule
    ],
    exports: [AuthorizationService],
})
export class AuthorizationModule {}