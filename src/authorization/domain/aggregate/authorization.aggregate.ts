import { User } from "src/authorization/domain/entities/user.entity";
import { CreateUserDto } from "src/authorization/domain/dto/create-user.dto";
import { Email } from "src/common/value-objects/email.vo";
import { PhoneNumber } from "src/common/value-objects/phone-number.vo";
import { UpdateUserDto } from "src/authorization/domain/dto/update-user.dto";
import { Password } from "src/common/value-objects/password.vo";
import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";
import { UserNotFoundException } from "src/common/exceptions/400-client/404/user-not-found.exception";
import { GenerateConfirmationCodeDto } from "src/authorization/domain/dto/generate-confirmation-code.dto";
import { ConfirmationCode } from "src/authorization/domain/entities/confirmation-code.entity";
import { CreateServiceDetailsDto } from "src/authorization/domain/dto/create-service-details.dto";
import { v4 as uuid } from "uuid";

export class AuthorizationAggregate {
    private readonly users: Array<User>;

    getUser(userId: string): User {
        return this.users.find(user => user.id === userId);
    }

    createUser(createUserDto: CreateUserDto, hashedPassword: string): User {
        const { email, phoneNumber } = createUserDto;
        const newUser = new User();

        const emailValueObject = new Email(email);
        const phoneNumberValueObject = new PhoneNumber(phoneNumber);

        newUser.email = emailValueObject.getValue();
        newUser.phoneNumber = phoneNumberValueObject.getValue();
        newUser.password = hashedPassword;

        return newUser;
    }

    createServiceDetails(user: User, createServiceDetailsDto: CreateServiceDetailsDto): ServiceDetails {
        const newServiceDetails = new ServiceDetails();

        newServiceDetails.id = uuid();
        newServiceDetails.user = user;
        newServiceDetails.personBestDescriptor = createServiceDetailsDto.personBestDescriptor;
        newServiceDetails.usagePurpose = createServiceDetailsDto.usagePurpose;
        newServiceDetails.businessDirection = createServiceDetailsDto.businessDirection;
        newServiceDetails.teamPeopleRange = createServiceDetailsDto.teamPeopleRange;
        newServiceDetails.companyName = createServiceDetailsDto.companyName;

        return newServiceDetails;
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

    generateConfirmationCode(
        user: User,
        generateConfirmationCodeDto: GenerateConfirmationCodeDto
    ): ConfirmationCode {
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