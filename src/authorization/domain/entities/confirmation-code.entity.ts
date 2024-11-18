import {Entity, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {v4 as uuid} from "uuid";
import {User} from "./user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class ConfirmationCode {
    @ApiProperty()
    @PrimaryKey()
    id: string = uuid();

    @ApiProperty()
    @Property()
    value: string;

    @ApiProperty()
    @Property()
    expiresAt: Date;

    @OneToOne(() => User, { nullable: true })
    user?: User;
}