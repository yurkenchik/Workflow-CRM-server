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
import {CommandBus} from "@nestjs/cqrs";
import {SendVerificationCodeCommand} from "../../../messaging/infrastructure/commands/send-verification-code.command";
import {Email} from "../../../common/value-objects/email.vo";
import {ConfirmationCodeService} from "./confirmation-code.service";

@Injectable()
export class AuthorizationService extends AuthorizationRepository {
    private readonly authorizationAggregate: AuthorizationAggregate = new AuthorizationAggregate();

    constructor(
        private readonly userService: AuthorizationUserService,
        private readonly tokenService: TokenService,
        private readonly confirmationCodeService: ConfirmationCodeService,
        private readonly commandBus: CommandBus,
    ) {
        super();
    }

    async registration(createUserDto: CreateUserDto): Promise<User> {
        const registeredUser = await this.userService.createUser(createUserDto);
        const verificationCode = this.generateVerificationCode();
        const sendVerificationCodeCommand = new SendVerificationCodeCommand(registeredUser.email, verificationCode);

        await this.confirmationCodeService.createConfirmationCode(registeredUser.id, { value: verificationCode });
        await this.commandBus.execute(sendVerificationCodeCommand);

        return registeredUser;
    }

    async confirmRegistration(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        const { email, confirmationCode } = confirmAuthorizationDto;
        const user = await this.userService.getUserByEmail(email);

        await this.confirmationCodeService.verifyConfirmationCode(confirmationCode);

        const { accessToken, refreshToken }  = await this.tokenService.generateTokens(user);
        user.refreshToken = refreshToken;
        user.isAccountVerified = true;
        await this.userService.save(user);
        await this.confirmationCodeService.deleteConfirmationCodeByUser(user.id);

        return { accessToken, refreshToken };
    }

    async login(loginDto: LoginDto): Promise<User> {
        const user = await this.validateUser(loginDto);
        const verificationCode = this.generateVerificationCode();
        const sendVerificationCodeCommand = new SendVerificationCodeCommand(loginDto.email, verificationCode);

        await this.commandBus.execute(sendVerificationCodeCommand);
        return user;
    }

    async confirmLogin(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto> {
        const { email, confirmationCode } = confirmAuthorizationDto;

        const user = await this.userService.getUserByEmail(email);

        await this.confirmationCodeService.verifyConfirmationCode(confirmationCode);

        const { accessToken, refreshToken } = await this.tokenService.generateTokens(user);
        user.refreshToken = refreshToken;
        await this.userService.save(user);
        await this.confirmationCodeService.deleteConfirmationCodeByUser(user.id);

        return { accessToken, refreshToken };
    }

    async logout(userId: string): Promise<void> {
        await this.userService.deleteUser(userId);
    }

    private async validateUser(loginDto: LoginDto): Promise<User> {
        const { email, password } = loginDto;
        const emailValueObject = new Email(email);
        const user = await this.userService.getUserByEmail(emailValueObject.getValue());

        this.authorizationAggregate.validatePasswords(password, user.password);
        return user;
    }

    private generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}