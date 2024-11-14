import {Injectable, Logger} from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import {MailDataRequired} from "@sendgrid/mail";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendgridClientService {
    private readonly logger = new Logger(SendgridClientService.name);

    constructor(
        private readonly configService: ConfigService
    ) {
        this.initializedSendGrid();
    }

    async sendEmail(mail: MailDataRequired) {
        return await SendGrid.send(mail);
    }

    private initializedSendGrid(): void {
        const apiKey = this.configService.get<string>("EMAIL_API_KEY");
        this.logger.log("apiKey: ", apiKey);
        if (!apiKey) {
            this.logger.log("No API key provided");
            throw new Error("No API key provided");
        }
        SendGrid.setApiKey(apiKey);
    }
}
