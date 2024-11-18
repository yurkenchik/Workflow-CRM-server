import {Entity, OneToOne, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import {UserSettings} from "./user-settings.entity";
import {User} from "../../../authorization/domain/entities/user.entity";

@Entity()
@Unique({ properties: ["phoneNumber", "email"] })
export class Profile {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    email: string;

    @Property()
    phoneNumber: string;

    @Property()
    fullName: string;

    @Property()
    location: string;

    @Property()
    company: string;

    @Property()
    position: string;

    @Property()
    birthDate: string;

    @Property()
    telegram?: string;

    @Property()
    linkedIn?: string;

    @Property()
    skype?: string;

    @Property()
    instagram?: string;

    @Property()
    facebook?: string;

    @OneToOne({ orphanRemoval: true })
    userSettings: UserSettings;

    @OneToOne(() => User, { nullable: false })
    user: User;
}