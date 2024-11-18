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
import {ApiProperty} from "@nestjs/swagger";

@Entity()
@Unique({ properties: ["email", "phoneNumber"] })
export class User {
    @ApiProperty()
    @PrimaryKey()
    id: string = uuid();

    @ApiProperty()
    @Property()
    email!: string;

    @ApiProperty()
    @Property()
    phoneNumber!: string;

    @ApiProperty()
    @Property()
    password!: string;

    @ApiProperty()
    @Property({ default: false })
    isAccountVerified: boolean = false;

    @ApiProperty()
    @Property({ nullable: true })
    refreshToken?: string;

    @OneToMany(() => Member, (members) => members.user)
    members = new Collection<Member>(this);

    @ApiProperty()
    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @ApiProperty()
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
