import {Module} from "@nestjs/common";
import {AuthorizationUserService} from "./infrastrcuture/services/authorization-user.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "./domain/entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TokenService} from "./infrastrcuture/services/token.service";

@Module({
    providers: [AuthorizationUserService, TokenService, AuthorizationUserService],
    controllers: [],
    imports: [
        ConfigModule,
        MikroOrmModule.forFeature({ entities: [User] }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
                    signOptions: {
                        expiresIn: configService.get<string>("JWT_REFRSH_TOKEN_EXPIRATION_MS"),
                    }
                }
            }
        })
    ],
    exports: [AuthorizationUserService],
})
export class AuthorizationModule {}