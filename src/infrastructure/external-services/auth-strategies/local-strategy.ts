import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {ValidateUserDto} from "../../../application/dto/auth/validate-user.dto";
import {AuthService} from "../../../application/services/auth.service";
import {User} from "../../../domain/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email",
        });
    }

    async validate(validateUserDto: ValidateUserDto): Promise<User> {
        return this.authService.validateUser(validateUserDto);
    }
}