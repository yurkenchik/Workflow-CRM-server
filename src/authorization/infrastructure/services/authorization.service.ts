import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { IsolationLevel } from "@mikro-orm/postgresql";

import { SendVerificationCodeCommand } from "src/messaging/infrastructure/commands/send-verification-code.command";
import { ConfirmationCodeService } from "src/authorization/infrastructure/services/confirmation-code.service";
import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { TokenService } from "src/authorization/infrastructure/services/token.service";
import { AuthorizationAggregate } from "src/authorization/domain/aggregate/authorization.aggregate";
import { AuthorizationRepository } from "src/authorization/domain/repository/authorization.repository";

import { User } from "src/authorization/domain/entities/user.entity";
import { Email } from "src/common/value-objects/email.vo";
import { LoginDto } from "src/authorization/domain/dto/login.dto";
import { CreateUserDto } from "src/authorization/domain/dto/create-user.dto";
import { ConfirmAuthorizationDto } from "src/authorization/domain/dto/confirm-authorization.dto";
import { AuthorizationResponseDto } from "src/authorization/domain/dto/authorization-response.dto";

import { Transactional } from "src/common/decorators/transactional.decorator";

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

    @Transactional({ isolationLevel: IsolationLevel.READ_COMMITTED })
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

    /**
     *
     * @param loginDto
     * @private
     * @type {function}
     *
     * This function uses READ_UNCOMMITED transaction isolation level, cause here are used only operations for reading data,
     * and this level of transaction is the fastest one and the least protected, but here it doesn`t metter as we only read data
     * */
    @Transactional({ isolationLevel: IsolationLevel.READ_UNCOMMITTED })
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