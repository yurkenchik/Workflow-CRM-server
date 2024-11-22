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
            const authorizationHeader = request.headers.authorization;

            if (!authorizationHeader) {
                throw new UnauthorizedException("Authorization header missing");
            }

            const [bearer, token] = authorizationHeader.split(" ");

            if (!token || bearer !== "Bearer") {
                throw new UnauthorizedException("Invalid authorization format");
            }

            const isAccessToken = this.isAccessTokenRequest(context);

            const secretKey = isAccessToken
                ? this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET")
                : this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET");

            const extractedUserFromToken = this.jwtService.verify(token, { secret: secretKey });

            request.user = extractedUserFromToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }

    private isAccessTokenRequest(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        if (request.headers['x-token-type'] === 'refresh') {
            return false;
        }

        const routePath = request.route?.path || '';
        return !routePath.includes("refresh");
    }
}