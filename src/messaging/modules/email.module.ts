import {Module} from "@nestjs/common";
import {EmailService} from "../infrastructure/services/email.service";
import {ConfigModule} from "@nestjs/config";
import {SendgridClientService} from "../infrastructure/services/send-grid-client.service";

@Module({
    providers: [EmailService, SendgridClientService],
    imports: [ConfigModule],
    exports: [EmailService, SendgridClientService],
})
export class EmailModule {}