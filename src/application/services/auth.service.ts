import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ValidateUserDto} from "../dto/auth/validate-user.dto";
import {UserService} from "./user.service";
import {compare} from "bcrypt";
import {User} from "../../domain/entities/user.entity";
import {TokensResponseDto} from "../dto/auth/tokens-response.dto";
import {TokenService} from "./token.service";
import {CreateUserDto} from "../dto/user/create-user.dto";
import {UserAlreadyExistsException} from "../../common/exceptions/user-already-exists.exception";
import hash from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async registration(registrationDto: CreateUserDto): Promise<TokensResponseDto> {
        try {
            const { email, phoneNumber, password } = registrationDto;
            const hashedPassword = hash(password, 6);
            const emailValue = this.userService.formatEmail(email);
            const phoneNumberValue = this.userService.formatPhoneNumber(phoneNumber);

            const registeredUser = await this.userService.createUser({
                ...registrationDto,
                password: hashedPassword,
                email: emailValue,
                phoneNumber: phoneNumberValue
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
        const emailValue = this.userService.formatEmail(loginDto.email.getEmail());

        const { accessToken, refreshToken } = await this.tokenService.generateTokens({
            id: authenticatedUser.id,
            email: emailValue,
            username: authenticatedUser.username,
            companyName: authenticatedUser.companyName,
        });

        authenticatedUser.refreshToken = refreshToken;
        await this.userService.saveUser(authenticatedUser);

        return { accessToken, refreshToken };
    }

    async validateUser(validateUserDto: ValidateUserDto): Promise<User> {
        const { email, password } = validateUserDto;
        const user = await this.userService.findUserByEmail(email);
        const authenticated = await compare(password, user.password);

        if (!authenticated) {
            throw new UnauthorizedException();
        }
        return user;
    }
}