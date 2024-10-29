import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {ConfigService} from "@nestjs/config";
import {ExtractJwt} from "passport-jwt";
import {Request} from "express";
import {TokenPayloadDto} from "../../../application/dto/auth/token-payload.dto";
import {UserService} from "../../../application/services/user.service";
import {User} from "../../../domain/entities/user.entity";
import {UserId} from "../../../domain/value-objects/user-id";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.headers?.authorization
            ]),
            secretOrKey: configService.getOrThrow<string>("JWT_ACCESS_TOKEN_SECRET_KEY"),
        });
    }

    async validate(tokenPayload: TokenPayloadDto): Promise<User> {
        const userId = new UserId(tokenPayload.id);
        return this.userService.findUserById(userId);
    }
}