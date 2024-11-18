import {
    Entity,
    Enum,
    OneToOne,
    PrimaryKey,
    Property,
    Cascade,
} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import { ServiceUsagePurpose } from "../../../common/enums/service-usage-purpose.enum";
import { PersonBestDescription } from "../../../common/enums/person-best-description.enum";
import { BusinessDirection } from "../../../common/enums/business-direction.enum";
import { User } from "./user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class ServiceDetails {
    @ApiProperty()
    @PrimaryKey()
    id: string = uuid();

    @ApiProperty()
    @Enum(() => ServiceUsagePurpose)
    usagePurpose!: ServiceUsagePurpose;

    @ApiProperty()
    @Enum(() => PersonBestDescription)
    personBestDescriptor!: PersonBestDescription;

    @ApiProperty()
    @Property({ nullable: true })
    companyName?: string;

    @Enum(() => BusinessDirection)
    businessDirection!: BusinessDirection;

    @ApiProperty()
    @Property({ nullable: true })
    teamPeopleRange?: string;

    @OneToOne(() => User)
    user?: User;
}
