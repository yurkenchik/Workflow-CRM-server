import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {User} from "../domain/entities/user.entity";
import {UserService} from "../application/services/user.service";
import {UserController} from "../presentation/controllers/user.controller";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [MikroOrmModule.forFeature([User])],
    exports: [UserService],
})
export class UserModule {}