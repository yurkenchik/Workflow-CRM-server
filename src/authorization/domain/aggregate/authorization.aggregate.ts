import {User} from "../entities/user.entity";
import {ServiceDetails} from "../entities/service-details.entity";
import {UserNotFoundException} from "../../../common/exceptions/400-client/404/user-not-found.exception";
import {CreateUserDto} from "../dto/create-user.dto";
import {Email} from "../../../common/value-objects/email.vo";
import {PhoneNumber} from "../../../common/value-objects/phone-number.vo";
import {Password} from "../../../common/value-objects/password.vo";
import {UpdateUserDto} from "../dto/update-user.dto";
import {ConfirmationCode} from "../entities/confirmation-code.entity";
import {GenerateConfirmationCodeDto} from "../dto/generate-confirmation-code.dto";

export class AuthorizationAggregate {
    private readonly users: Array<User>;

    getUser(userId: string): User {
        return this.users.find(user => user.id === userId);
    }

    createUser(createUserDto: CreateUserDto): User {
        const { email, phoneNumber, password } = createUserDto;
        const newUser = new User();

        const emailValueObject = new Email(email);
        const phoneNumberValueObject = new PhoneNumber(phoneNumber);
        const passwordValueObject = new Password(password);

        newUser.email = emailValueObject.getValue();
        newUser.phoneNumber = phoneNumberValueObject.getValue();
        newUser.password = passwordValueObject.getValue();

        return newUser;
    }

    updateUser(user: User, updateUserDto: UpdateUserDto): User {
        const { email, phoneNumber, password } = updateUserDto;

        if (email) {
            const emailValueObject = new Email(email);
            user.email = emailValueObject.getValue();
        }

        if (phoneNumber) {
            const phoneNumberValueObject = new PhoneNumber(phoneNumber);
            user.phoneNumber = phoneNumberValueObject.getValue()
        }

        if (password) {
            const passwordValueObject = new Password(password);
            user.password = passwordValueObject.getValue();
        }

        return user;
    }

    saveServiceDetailsFroUser(user: User, serviceDetails: ServiceDetails): ServiceDetails {
        if (!user) {
            throw new UserNotFoundException();
        }

        serviceDetails.user = user;
        return serviceDetails;
    }

    generateConfirmationCode(user: User, generateConfirmationCodeDto: GenerateConfirmationCodeDto): ConfirmationCode {
        if (!user) {
            throw new UserNotFoundException();
        }

        const confirmationCode = new ConfirmationCode();

        confirmationCode.value = generateConfirmationCodeDto.value;
        confirmationCode.expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        return confirmationCode;
    }

    validatePasswords(inputPassword: string, storedPassword: string): void {
        const passwordValueObject = new Password(inputPassword);

        if (!passwordValueObject.comparePasswords(storedPassword)) {
            throw new UserNotFoundException();
        }
    }
}