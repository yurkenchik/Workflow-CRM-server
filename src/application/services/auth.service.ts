import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ValidateUserDto} from "../dto/auth/validate-user.dto";
import {UserService} from "./user.service";
import {User} from "../../domain/entities/user.entity";
import {TokensResponseDto} from "../dto/auth/tokens-response.dto";
import {TokenService} from "./token.service";
import {CreateUserDto} from "../dto/user/create-user.dto";
import {UserAlreadyExistsException} from "../../common/exceptions/user-already-exists.exception";
import hash from "bcrypt"
import {Email} from "../../domain/value-objects/email";
import {Password} from "../../domain/value-objects/password";
import {UserId} from "../../domain/value-objects/user-id";
import {RefreshToken} from "../../domain/value-objects/refresh-token";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async registration(registrationDto: CreateUserDto): Promise<TokensResponseDto> {
        try {
            const hashedPassword = hash(registrationDto.password, 6);

            const registeredUser = await this.userService.createUser({
                ...registrationDto,
                password: hashedPassword,
            });

            const { accessToken, refreshToken } = await this.tokenService.generateTokens(registeredUser);
            registeredUser.refreshToken = refreshToken;
            await this.userService.saveUser(registeredUser);

            return { accessToken, refreshToken };
        } catch (error) {
            if (error.code === "23505") {
                throw new UserAlreadyExistsException();
            }
        }
    }

    async login(loginDto: ValidateUserDto): Promise<TokensResponseDto> {
        const authenticatedUser = await this.validateUser(loginDto);

        const { accessToken, refreshToken } = await this.tokenService.generateTokens({
            id: authenticatedUser.id,
            email: authenticatedUser.email,
            username: authenticatedUser.username,
            companyName: authenticatedUser.companyName,
        });

        authenticatedUser.refreshToken = refreshToken;
        await this.userService.saveUser(authenticatedUser);

        return { accessToken, refreshToken };
    }

    async validateUser(validateUserDto: ValidateUserDto): Promise<User> {
        const { email, password } = validateUserDto;

        const emailValueObject = new Email(email);
        const passwordValueObject = new Password(password);

        const user = await this.userService.findUserByEmail(emailValueObject);
        const isPasswordValid = await passwordValueObject.comparePasswords(user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async verifyUserRefreshToken(userId: UserId, refreshToken: RefreshToken): Promise<User> {
        const user = await this.userService.findUserById(userId);
        const isAuthenticated = await refreshToken.compareRefreshTokens(user.refreshToken);

        if (!isAuthenticated) {
            throw new UnauthorizedException();
        }
        return user;
    }
}