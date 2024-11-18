import {
    Collection,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
    Unique,
} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import { Member } from "../../../project/domain/entities/member.entity";
import { ServiceDetails } from "./service-details.entity";

@Entity()
@Unique({ properties: ["email", "phoneNumber"] })
export class User {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    email!: string;

    @Property()
    phoneNumber!: string;

    @Property()
    password!: string;

    @Property({ default: false })
    isAccountVerified: boolean = false;

    @Property({ nullable: true })
    refreshToken?: string;

    @OneToMany(() => Member, (members) => members.user)
    members = new Collection<Member>(this);

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
