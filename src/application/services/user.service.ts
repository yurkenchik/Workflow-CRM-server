import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {User} from "../../domain/entities/user.entity";
import {CreateUserDto} from "../dto/user/create-user.dto";
import {Email} from "../../domain/value-objects/email/email";
import {UpdateUserDto} from "../dto/user/update-user.dto";
import {PhoneNumber} from "../../domain/value-objects/phone-number/phone-number";
import {UserNotFoundException} from "../../common/exceptions/user-not-found.exception";
import {UserRepository} from "../../domain/repositories/user.repository";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
    ) {}

    async findUserById(userId: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .where({ id: userId })
            .getSingleResult();

        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    async findUsers(): Promise<Array<User>> {
        return this.userRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, phoneNumber } = createUserDto;
        const emailValue = this.formatEmail(email.getEmail());
        const phoneNumberValue = this.formatPhoneNumber(phoneNumber.getPhoneNumber());

        return await this.userRepository
            .createQueryBuilder("user")
            .insert({
                id: uuidv4(),
                ...createUserDto,
                email: emailValue,
                phoneNumber: phoneNumberValue
            })
            .execute();
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { email, phoneNumber } = updateUserDto;
        const emailValue = this.formatEmail(email.getEmail());
        const phoneNumberValue = this.formatPhoneNumber(phoneNumber.getPhoneNumber());
        const user = await this.findUserById(userId);

        return await this.userRepository
            .createQueryBuilder("user")
            .update({
                ...updateUserDto,
                email: emailValue,
                phoneNumber: phoneNumberValue
            })
            .where({ id: user.id })
            .execute();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository.nativeDelete(userId);
    }

    private formatEmail(email: string): string {
        return new Email(email).getEmail();
    }

    private formatPhoneNumber(phoneNumber: string): string {
        return new PhoneNumber(phoneNumber).getPhoneNumber();
    }
}