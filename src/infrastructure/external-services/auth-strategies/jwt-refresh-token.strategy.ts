import {Injectable, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {TokenPayloadDto} from "../../../application/dto/auth/token-payload.dto";
import {AuthService} from "../../../application/services/auth.service";
import {UserId} from "../../../domain/value-objects/user-id";
import {RefreshToken} from "../../../domain/value-objects/refresh-token";
import {User} from "../../../domain/entities/user.entity";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh,
            ]),
            secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: TokenPayloadDto): Promise<User> {
        try {
            const userId = new UserId(payload.id);
            const accessToken = request.headers['authorization'].split(" ")[1];
            const refreshToken = request.headers['x-refresh-token'] as string;

            return this.authService.verifyUserRefreshToken(userId, new RefreshToken(refreshToken));
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}