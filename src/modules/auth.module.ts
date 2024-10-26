import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "../application/services/auth.service";
import {LocalStrategy} from "../infrastructure/external-services/auth-strategies/local-strategy";
import {UserModule} from "./user.module";
import {JwtStrategy} from "../infrastructure/external-services/auth-strategies/jwt-strategy";

@Module({
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [],
    imports: [JwtModule, PassportModule, UserModule],
    exports: []
})
export class AuthModule {}