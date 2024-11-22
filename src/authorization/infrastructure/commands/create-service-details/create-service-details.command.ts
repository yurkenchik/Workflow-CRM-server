import { CreateServiceDetailsDto } from "src/authorization/domain/dto/create-service-details.dto";

export class CreateServiceDetailsCommand {
    constructor(
        public readonly userId: string,
        public readonly createServiceDetailsDto: CreateServiceDetailsDto,
    ) {}
}