import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../domain/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {AuthorizationResponseDto} from "../../domain/dto/authorization-response.dto";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateTokens(userData: User): Promise<AuthorizationResponseDto> {
        const { email, phoneNumber } = userData;

        const accessToken = this.jwtService.sign({ email, phoneNumber }, {
            secret: this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRATION_MS"),
        });

        const refreshToken = this.jwtService.sign({ email, phoneNumber }, {
            secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_MS"),
        });

        return { accessToken, refreshToken };
    }
}