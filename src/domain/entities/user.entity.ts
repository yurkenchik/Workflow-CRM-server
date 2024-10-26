import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {UserRepository} from "../repositories/user.repository";

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

    @Property({ type: String, nullable: false })
    companyName: string;
}