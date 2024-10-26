import {EntityRepository} from "@mikro-orm/postgresql";
import {User} from "../entities/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends EntityRepository<User> {
}