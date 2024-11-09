import {Module} from "@nestjs/common";
import {AuthorizationUserService} from "./infrastrcuture/authorization-user.service";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "./domain/entities/user.entity";

@Module({
    providers: [AuthorizationUserService],
    controllers: [],
    imports: [MikroOrmModule.forFeature({ entities: [User] })],
    exports: [AuthorizationUserService],
})
export class AuthorizationModule {}