import { BusinessDirection } from "src/common/enums/business-direction.enum";
import { PersonBestDescription } from "src/common/enums/person-best-description.enum";
import { ServiceUsagePurpose } from "src/common/enums/service-usage-purpose.enum";

export class CreateServiceDetailsDto {
    readonly usagePurpose: ServiceUsagePurpose;
    readonly personBestDescriptor: PersonBestDescription;
    readonly companyName: string;
    readonly businessDirection: BusinessDirection;
    readonly teamPeopleRange: string;
}