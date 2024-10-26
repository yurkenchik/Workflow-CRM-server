import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "../../application/services/guards/local-auth-guard";
import {AuthService} from "../../application/services/auth.service";
import {TokenService} from "../../application/services/token.service";
import {TokensResponseDto} from "../../application/dto/auth/tokens-response.dto";
import {ValidateUserDto} from "../../application/dto/auth/validate-user.dto";
import {CreateUserDto} from "../../application/dto/user/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {}

    @Post("registration")
    async registration(@Body() registrationDto: CreateUserDto): Promise<TokensResponseDto> {
        return this.authService.registration(registrationDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Body() loginDto: ValidateUserDto): Promise<TokensResponseDto> {
        return this.authService.login(loginDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("refresh-token")
    async refreshToken(@Body() refreshToken: string): Promise<TokensResponseDto> {
        return this.tokenService.refreshToken(refreshToken);
    }
}