import {Injectable} from "@nestjs/common";
import {UserRepository} from "../../domain/repositories/user.repository";

@Injectable()
export class UserOrmRepository extends UserRepository {
}