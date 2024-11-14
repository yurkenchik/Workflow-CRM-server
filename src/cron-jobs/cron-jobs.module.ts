import {Module} from "@nestjs/common";
import {CleanUpService} from "./infrastructure/services/clean-up.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfirmationCode} from "../authorization/domain/entities/confirmation-code.entity";
import {User} from "../authorization/domain/entities/user.entity";

@Module({
    providers: [CleanUpService],
    imports: [
        MikroOrmModule.forFeature({ entities: [User, ConfirmationCode] }),
    ],
    exports: [CleanUpService],
})
export class CronJobsModule {}