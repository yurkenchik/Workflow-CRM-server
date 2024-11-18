import { BusinessDirection } from "src/common/enums/business-direction.enum";
import { PersonBestDescription } from "src/common/enums/person-best-description.enum";
import { ServiceUsagePurpose } from "src/common/enums/service-usage-purpose.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateServiceDetailsDto {
    @ApiProperty()
    readonly usagePurpose: ServiceUsagePurpose;
    @ApiProperty()
    readonly personBestDescriptor: PersonBestDescription;
    @ApiProperty()
    readonly companyName: string;
    @ApiProperty()
    readonly businessDirection: BusinessDirection;
    @ApiProperty()
    readonly teamPeopleRange: string;
}