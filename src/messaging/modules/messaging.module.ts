import {Module} from "@nestjs/common";
import {EmailService} from "../infrastructure/services/email.service";
import {ConfigModule} from "@nestjs/config";
import {SendgridClientService} from "../infrastructure/services/send-grid-client.service";
import {SendVerificationCodeHandler} from "src/messaging/infrastructure/handlers/send-verification-code.handler";

@Module({
    providers: [EmailService, SendgridClientService, SendVerificationCodeHandler],
    imports: [ConfigModule],
    exports: [EmailService, SendgridClientService, SendVerificationCodeHandler],
})
export class MessagingModule {}