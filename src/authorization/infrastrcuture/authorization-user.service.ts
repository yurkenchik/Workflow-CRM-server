import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {User} from "../domain/entities/user.entity";
import {EntityRepository} from "@mikro-orm/postgresql";
import {AuthorizationUserRepository} from "../domain/repository/authorization-user.repository";
import {UpdateUserDto} from "../domain/dto/update-user.dto";
import {UserNotFoundException} from "../../common/exceptions/400-client/404/user-not-found.exception";
import { v4 as uuid } from "uuid";
import {Email} from "../../common/value-objects/email.vo";
import {CreateUserDto} from "../domain/dto/create-user.dto";
import {PhoneNumber} from "../../common/value-objects/phone-number.vo";

@Injectable()
export class AuthorizationUserService extends AuthorizationUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>
    ) {
        super()
    }

    async getUsers(): Promise<Array<User>> {
        return this.userRepository
            .createQueryBuilder()
            .getResultList();
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder()
            .where({ id: userId })
            .getSingleResult();

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, phoneNumber } = createUserDto;
        const emailValueObject = new Email(email);
        const phoneNumberValueObject = new PhoneNumber(phoneNumber);

        return this.userRepository
            .createQueryBuilder()
            .insert({
                id: uuid(),
                email: emailValueObject.getValue(),
                phoneNumber: phoneNumberValueObject.getValue(),
                ...createUserDto
            })
            .execute();
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(userId);

        return await this.userRepository
            .createQueryBuilder()
            .update(updateUserDto)
            .where({ id: user.id })
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
}