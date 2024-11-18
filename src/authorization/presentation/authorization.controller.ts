import {Body, Controller, Delete, Post} from "@nestjs/common";
import {AuthorizationService} from "src/authorization/infrastructure/services/authorization.service";
import {CreateUserDto} from "../domain/dto/create-user.dto";
import {User} from "../domain/entities/user.entity";
import {LoginDto} from "../domain/dto/login.dto";
import {AuthorizationResponseDto} from "../domain/dto/authorization-response.dto";
import {ConfirmAuthorizationDto} from "../domain/dto/confirm-authorization.dto";
import {UserId} from "../../common/decorators/user-id.decorator";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {
    constructor(private readonly authorizationService: AuthorizationService) {}

    @ApiOperation({ summary: 'Registration' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, type: User })
    @Post("registration")
    async registration(@Body() registrationDto: CreateUserDto): Promise<User> {
        return this.authorizationService.registration(registrationDto);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, type: User })
    @Post("login")
    async login(@Body() registrationDto: LoginDto): Promise<User> {
        return this.authorizationService.login(registrationDto);
    }

    @ApiOperation({ summary: 'Registration confirmation' })
    @ApiBody({ type: ConfirmAuthorizationDto })
    @ApiResponse({ status: 200, type: AuthorizationResponseDto })
    @Post("confirm-registration")
    async confirmRegistration(@Body() confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        return this.authorizationService.confirmRegistration(confirmAuthorizationDto);
    }

    @ApiOperation({ summary: 'Login confirmation' })
    @ApiBody({ type: ConfirmAuthorizationDto })
    @ApiResponse({ status: 200, type: AuthorizationResponseDto })
    @Post("confirm-login")
    async confirmLogin(@Body() confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        return this.authorizationService.confirmLogin(confirmAuthorizationDto);
    }

    @ApiOperation({ summary: 'Logging out of the account' })
    @ApiBearerAuth()
    @Delete("logout")
    async logout(@UserId()userId: string): Promise<void> {
        return this.authorizationService.logout(userId);
    }
}