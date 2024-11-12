import {User} from "../entities/user.entity";
import {CreateUserDto} from "../dto/create-user.dto";
import {ConfirmAuthorizationDto} from "../dto/confirm-authorization.dto";
import {LoginDto} from "../dto/login.dto";
import {AuthorizationResponseDto} from "../dto/authorization-response.dto";

export abstract class AuthorizationRepository {
    abstract registration(createUserDto: CreateUserDto): Promise<User>;
    abstract confirmRegistration(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto>;
    abstract login(loginDto: LoginDto): Promise<User>;
    abstract confirmLogin(confirmAuthorizationDto: ConfirmAuthorizationDto): Promise<AuthorizationResponseDto>;
    abstract logout(userId: string): Promise<void>;
}