import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {User} from "../../domain/entities/user.entity";
import {EntityRepository, EntityManager} from "@mikro-orm/postgresql";
import {UpdateUserDto} from "../../domain/dto/update-user.dto";
import {UserNotFoundException} from "../../../common/exceptions/400-client/404/user-not-found.exception";
import {CreateUserDto} from "../../domain/dto/create-user.dto";
import {AuthorizationAggregate} from "../../domain/aggregate/authorization.aggregate";
import {UserAlreadyExistsException} from "../../../common/exceptions/400-client/400/user-already-exists.exception";

@Injectable()
export class AuthorizationUserService {
    private readonly authorizationAggregate: AuthorizationAggregate = new AuthorizationAggregate();

    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        private readonly entityManager: EntityManager,
    ) {}

    async getUsers(): Promise<Array<User>> {
        return this.userRepository
            .createQueryBuilder()
            .getResultList();
    }

    async getUserById(userId: string): Promise<User> {
        return this.getUserByField(userId, "id");
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.getUserByField(email, "email");
    }

    async save(user: User): Promise<void> {
        return this.entityManager.persistAndFlush(user);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const userPayload = this.authorizationAggregate.createUser(createUserDto);

            const user = await this.userRepository
                .createQueryBuilder()
                .insert(userPayload)
                .returning("*")
                .execute();

            return this.getUserById(user.insertId);
        } catch (error) {
            if (error.code === "23505") {
                throw new UserAlreadyExistsException();
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(userId);
        const updatedUser = this.authorizationAggregate.updateUser(user, updateUserDto);

        return await this.userRepository
            .createQueryBuilder()
            .update(updatedUser)
            .where({ id: userId })
            .execute();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where({ id: userId })
            .execute();
    }

    private async getUserByField(value: string, field: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder()
            .where({ [field]: value })
            .getSingleResult();

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }
}