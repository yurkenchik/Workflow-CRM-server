import { Body, Controller, Delete, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";

import { RegistrationCommand } from "src/authorization/infrastructure/commands/registration/registration.command";
import { LoginCommand } from "src/authorization/infrastructure/commands/login/login.command";
import {
    ConfirmRegistrationCommand
} from "src/authorization/infrastructure/commands/confirm-registration/confirm-registration.command";
import { ConfirmLoginCommand } from "src/authorization/infrastructure/commands/confirm-login/confirm-login.command";
import { LogOutCommand } from "src/authorization/infrastructure/commands/log-out/log-out.command";
import { CreateUserDto } from "src/authorization/domain/dto/create-user.dto";
import { User } from "src/authorization/domain/entities/user.entity";
import { LoginDto } from "src/authorization/domain/dto/login.dto";
import { ConfirmAuthorizationDto } from "src/authorization/domain/dto/confirm-authorization.dto";
import { AuthorizationResponseDto } from "src/authorization/domain/dto/authorization-response.dto";
import { UserId } from "src/common/decorators/user-id.decorator";
import { RefreshTokenCommand } from "src/authorization/infrastructure/commands/refresh-token/refresh-token.command";
import { RefreshTokenDto } from "src/authorization/domain/dto/refresh-token.dto";

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {
    constructor(private readonly commandBus: CommandBus) {}

    @ApiOperation({ summary: 'Registration' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, type: User })
    @Post("registration")
    async registration(@Body() registrationDto: CreateUserDto): Promise<User> {
        return this.commandBus.execute(new RegistrationCommand(registrationDto));
    }

    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, type: User })
    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<User> {
        return this.commandBus.execute(new LoginCommand(loginDto));
    }

    @ApiOperation({ summary: 'Registration confirmation' })
    @ApiBody({ type: ConfirmAuthorizationDto })
    @ApiResponse({ status: 200, type: AuthorizationResponseDto })
    @Post("confirm-registration")
    async confirmRegistration(@Body() confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        return this.commandBus.execute(new ConfirmRegistrationCommand(confirmAuthorizationDto));
    }

    @ApiOperation({ summary: 'Login confirmation' })
    @ApiBody({ type: ConfirmAuthorizationDto })
    @ApiResponse({ status: 200, type: AuthorizationResponseDto })
    @Post("confirm-login")
    async confirmLogin(@Body() confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        return this.commandBus.execute(new ConfirmLoginCommand(confirmAuthorizationDto));
    }

    @ApiOperation({ summary: 'Logging out of the account' })
    @ApiBearerAuth()
    @Delete("logout")
    async logout(@UserId() userId: string): Promise<void> {
        return this.commandBus.execute(new LogOutCommand(userId));
    }

    @ApiOperation({ summary: 'Refreshing token' })
    @ApiBearerAuth()
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({ status: 201, type: AuthorizationResponseDto })
    @Post("refresh-token")
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthorizationResponseDto> {
        return this.commandBus.execute(new RefreshTokenCommand(refreshTokenDto));
    }
}