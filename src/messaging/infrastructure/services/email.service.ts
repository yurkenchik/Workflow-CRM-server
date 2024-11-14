import {MailDataRequired} from "@sendgrid/mail";
import {ConfigService} from "@nestjs/config";
import {SendgridClientService} from "./send-grid-client.service";
import {SendEmailDto} from "../../domain/dto/send-email.dto";
import {Injectable, InternalServerErrorException} from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly sendGridClientService: SendgridClientService
    ) {}

    async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const { email, subject, text } = sendEmailDto;

        try {
            const mail: MailDataRequired = {
                to: email,
                from: this.configService.get<string>("EMAIL_SENDER"),
                subject,
                text,
            };
            await this.sendGridClientService.sendEmail(mail);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}