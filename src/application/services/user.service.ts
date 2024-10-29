import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {User} from "../../domain/entities/user.entity";
import {CreateUserDto} from "../dto/user/create-user.dto";
import {Email} from "../../domain/value-objects/email";
import {UpdateUserDto} from "../dto/user/update-user.dto";
import {UserNotFoundException} from "../../common/exceptions/user-not-found.exception";
import {UserRepository} from "../../domain/repositories/user.repository";
import { v4 as uuidv4 } from "uuid";
import {UserId} from "../../domain/value-objects/user-id";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ) {}

    async findUserById(userId: UserId): Promise<User> {
        return this.findUserByField(userId, "id");
    }

    async findUserByEmail(email: Email): Promise<User> {
        const emailValueObject = new Email(email.getValue());
        return this.findUserByField(emailValueObject, "email");
    }

    async findUsers(): Promise<Array<User>> {
        return this.userRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository
            .createQueryBuilder("user")
            .insert({
                id: uuidv4(),
                ...createUserDto
            })
            .execute();
    }

    async updateUser(userId: UserId, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findUserById(userId);

        return await this.userRepository
            .createQueryBuilder("user")
            .update(updateUserDto)
            .where({ id: user.id })
            .execute();
    }

    async saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async deleteUser(userId: UserId): Promise<void> {
        await this.userRepository.nativeDelete(userId.getValue());
    }

    private async findUserByField(value: Email | UserId, field: keyof User): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .where({ [field]: value.getValue })
            .getSingleResult();

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }
}