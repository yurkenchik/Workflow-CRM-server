import {Entity, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {v4 as uuid} from "uuid";
import {User} from "./user.entity";

@Entity()
export class ConfirmationCode {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    value: string;

    @Property()
    expiresAt: Date;

    @OneToOne(() => User, user => user.confirmationCode)
    user: User;
}