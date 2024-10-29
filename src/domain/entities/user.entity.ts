import {BeforeCreate, BeforeUpdate, Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {UserRepository} from "../repositories/user.repository";
import {Email} from "../value-objects/email";
import {PhoneNumber} from "../value-objects/phone-number";
import {Username} from "../value-objects/username";
import {Password} from "../value-objects/password";
import {CompanyName} from "../value-objects/companyName";
import {RefreshToken} from "../value-objects/refresh-token";

@Entity({ repository: () => UserRepository })
export class User {
    @PrimaryKey({ type: "uuid" })
    id: string;

    @Property({ type: String, nullable: true })
    username: string;

    @Property({ type: String, unique: true, nullable: false })
    email: string;

    @Property({ type: String, unique: true, nullable: false })
    phoneNumber: string;

    @Property({ type: String, nullable: false })
    password: string;

    @Property({ type: String })
    refreshToken: string;

    @Property({ type: String, nullable: false })
    companyName: string;

    @BeforeCreate()
    beforeCreate() {
        this.validateUserValueObjects();
    };

    @BeforeUpdate()
    beforeUpdate() {
        this.validateUserValueObjects();
    };

    private validateUserValueObjects() {
        const emailVO = new Email(this.email);
        const phoneNumberVO = new PhoneNumber(this.phoneNumber);
        const usernameVO = new Username(this.username);
        const passwordVO = new Password(this.password);

        this.email = emailVO.getValue();
        this.phoneNumber = phoneNumberVO.getValue();
        this.username = usernameVO.getValue();
        this.password = passwordVO.getValue();

        if (this.companyName) {
            const companyNameVO = new CompanyName(this.companyName);
            this.companyName = companyNameVO.getValue();
        }

        if (this.refreshToken) {
            const refreshTokenVO = new RefreshToken(this.refreshToken);
            this.refreshToken = refreshTokenVO.getValue();
        }
    }
}