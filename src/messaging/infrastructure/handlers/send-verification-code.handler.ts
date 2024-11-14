import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SendVerificationCodeCommand} from "../commands/send-verification-code.command";
import {EmailService} from "../services/email.service";
import {HttpException, InternalServerErrorException} from "@nestjs/common";

@CommandHandler(SendVerificationCodeCommand)
export class SendVerificationCodeHandler implements ICommandHandler<SendVerificationCodeCommand> {
    constructor(
        private readonly emailService: EmailService,
    ) {}

    async execute(command: SendVerificationCodeCommand): Promise<void> {
        try {
            const { email, verificationCode } = command;

            const subject = 'Your Verification Code';
            const text = `Your verification code is: ${verificationCode}`;

            const emailResult = await this.emailService.sendEmail({ email, subject, text });
            console.log(emailResult);
            return emailResult;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}