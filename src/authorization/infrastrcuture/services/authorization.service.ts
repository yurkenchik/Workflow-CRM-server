import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../../domain/dto/create-user.dto";
import {User} from "../../domain/entities/user.entity";
import {AuthorizationRepository} from "../../domain/repository/authorization.repository";
import {ConfirmAuthorizationDto} from "../../domain/dto/confirm-authorization.dto";
import {AuthorizationResponseDto} from "../../domain/dto/authorization-response.dto";
import {LoginDto} from "../../domain/dto/login.dto";
import {AuthorizationUserService} from "./authorization-user.service";
import {TokenService} from "./token.service";
import {AuthorizationAggregate} from "../../domain/aggregate/authorization.aggregate";

@Injectable()
export class AuthorizationService extends AuthorizationRepository {
    private readonly authorizationAggregate: AuthorizationAggregate;

    constructor(
        private readonly userService: AuthorizationUserService,
        private readonly tokenService: TokenService,
    ) {
        super();
    }

    async registration(createUserDto: CreateUserDto): Promise<User> {
        const registeredUser = await this.userService.createUser(createUserDto);
        return;
    }

    async confirmRegistration(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        const { email, password } = confirmAuthorizationDto;
        const user = await this.userService.getUserByEmail(email);

        this.authorizationAggregate.validatePasswords(password, user.password);

        const { accessToken, refreshToken }  = await this.tokenService.generateTokens(user);
        user.refreshToken = refreshToken;
        user.isAccountVerified = true;
        await this.userService.save(user);

        return { accessToken, refreshToken };
    }

    async login(loginDto: LoginDto): Promise<User> {
        return;
    }

    async confirmLogin(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        const { email, password } = confirmAuthorizationDto;

        const user = await this.userService.getUserByEmail(email);

        this.authorizationAggregate.validatePasswords(password, user.password);
        const { accessToken, refreshToken } = await this.tokenService.generateTokens(user);
        user.refreshToken = refreshToken;
        await this.userService.save(user);

        return { accessToken, refreshToken };
    }

    async logout(userId: string): Promise<void> {
        await this.userService.deleteUser(userId);
    }
}