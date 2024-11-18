import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const [bearer, token] = request.headers.authorization;

            if (!token || bearer !== "Bearer") {
                throw new UnauthorizedException();
            }

            const extractedUserFromToken = this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            });

            request.user = extractedUserFromToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}