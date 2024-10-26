import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {TokenPayloadDto} from "../dto/auth/token-payload.dto";
import {TokensResponseDto} from "../dto/auth/tokens-response.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    private async generateToken(
        tokenPayloadDto: TokenPayloadDto,
        secret: string,
        expiresIn: string
    ): Promise<string> {
        return await this.jwtService.signAsync(tokenPayloadDto, { secret, expiresIn });
    }

    async generateTokens(tokenPayloadDto: TokenPayloadDto): Promise<TokensResponseDto> {
        const accessToken = await this.generateToken(
            tokenPayloadDto,
            this.configService.get<string>("JWT_ACCESS_TOKEN_SECRET_KEY"),
            this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRATION_MS")
        );

        const refreshToken = await this.generateToken(
            tokenPayloadDto,
            this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET_KEY"),
            this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_MS")
        );

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<TokensResponseDto> {
        try {
            const decodedToken: TokenPayloadDto = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET_KEY")
            });
            return this.generateTokens(decodedToken);
        } catch (error) {
            throw new UnauthorizedException("Invalid refresh token");
        }
    }
}