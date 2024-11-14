import {Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import {ServiceDetails} from "./service-details.entity";
import {Profile} from "../../../profile/domain/entities/profile.entity";
import {Member} from "../../../project/domain/entities/member.entity";
import {ConfirmationCode} from "./confirmation-code.entity";

@Entity()
@Unique({ properties: ["email", "phoneNumber"] })
export class User {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    @Unique()
    email!: string;

    @Property()
    @Unique()
    phoneNumber!: string;

    @Property()
    password: string;

    @Property({ default: false })
    isAccountVerified: boolean;

    @Property({ nullable: true })
    refreshToken: string;

    @OneToMany(() => Member, members => members.user)
    members: Collection<Member> = new Collection<Member>(this);

    @Property({ onCreate: () => new Date() })
    createdAt?: Date;

    @Property({ onUpdate: () => new Date() })
    updatedAt?: Date;
}