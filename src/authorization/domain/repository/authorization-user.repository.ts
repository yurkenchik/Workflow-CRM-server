import {User} from "../entities/user.entity";
import {CreateUserDto} from "../dto/create-user.dto";
import {UpdateUserDto} from "../dto/update-user.dto";

export abstract class AuthorizationUserRepository {
    abstract getUsers(): Promise<User[]>;
    abstract getUserById(userId: string): Promise<User>;
    abstract createUser(createUserDto: CreateUserDto): Promise<User>;
    abstract updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
    abstract deleteUser(userId: string): Promise<void>;
}