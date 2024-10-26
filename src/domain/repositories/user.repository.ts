import {EntityManager, EntityRepository} from "@mikro-orm/postgresql";
import {User} from "../entities/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends EntityRepository<User> {
    constructor(private readonly entityManager: EntityManager) {
        super(entityManager, User);
    }

    async save(user: User): Promise<User> {
        await this.entityManager.persistAndFlush(user);
        return user;
    }
}