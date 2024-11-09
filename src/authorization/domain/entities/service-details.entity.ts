import {Entity, Enum, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import {ServiceUsagePurpose} from "../../../common/enums/service-usage-purpose.enum";
import {PersonBestDescription} from "../../../common/enums/person-best-description.enum";
import {BusinessDirection} from "../../../common/enums/business-direction.enum";
import {User} from "./user.entity";

@Entity()
export class ServiceDetails {
    @PrimaryKey()
    id: string = uuid();

    @Enum(() => ServiceUsagePurpose)
    usagePurpose: ServiceUsagePurpose;

    @Enum(() => PersonBestDescription)
    personBestDescriptor: PersonBestDescription;

    @Property()
    companyName: string;

    @Enum(() => BusinessDirection)
    businessDirection: BusinessDirection;

    @Property()
    teamPeopleRange: string;

    @OneToOne(() => User, user => user.serviceDetails)
    user: User;
}