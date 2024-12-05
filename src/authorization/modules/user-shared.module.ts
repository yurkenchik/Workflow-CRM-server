import { Module} from "@nestjs/common";
import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { ConfirmationCodeService } from "src/authorization/infrastructure/services/confirmation-code.service";
import { MikroOrmModule} from "@mikro-orm/nestjs";
import { User } from "src/authorization/domain/entities/user.entity";
import {ConfirmationCode} from "src/authorization/domain/entities/confirmation-code.entity";

@Module({
    imports: [ MikroOrmModule.forFeature({ entities: [User, ConfirmationCode] })],
    providers: [AuthorizationUserService, ConfirmationCodeService],
    exports: [AuthorizationUserService, ConfirmationCodeService],
})
export class UserSharedModule {}