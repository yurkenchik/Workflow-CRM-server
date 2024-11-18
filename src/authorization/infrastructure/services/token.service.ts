import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";

import { User } from "src/authorization/domain/entities/user.entity";
import { AuthorizationResponseDto } from "src/authorization/domain/dto/authorization-response.dto";


@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: AuthorizationUserService
    ) {}

    async generateTokens(userData: Partial<User>): Promise<AuthorizationResponseDto> {
        const { id, email, phoneNumber } = userData;

        const accessToken = this.jwtService.sign({ id, email, phoneNumber }, {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRATION_MS"),
        });

        const refreshToken = this.jwtService.sign({ id, email, phoneNumber }, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_MS"),
        });

        return { accessToken, refreshToken };
    }

    async refreshToken(userId: string): Promise<AuthorizationResponseDto> {
        const user = await this.userService.getUserById(userId);
        const { accessToken, refreshToken } = await this.generateTokens(user);

        user.refreshToken = refreshToken;
        await this.userService.save(user);
        return { accessToken, refreshToken };
    }
}