import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
    CreateServiceDetailsCommand
} from "src/authorization/infrastructure/commands/create-service-details/create-service-details.command";
import { ServiceDetailsService } from "src/authorization/infrastructure/services/service-details.service";
import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";

@CommandHandler(CreateServiceDetailsCommand)
export class CreateServiceDetailsCommandHandler
    implements ICommandHandler<CreateServiceDetailsCommand>
{
    constructor(private readonly serviceDetailsService: ServiceDetailsService) {}

    execute(command: CreateServiceDetailsCommand): Promise<ServiceDetails> {
        const { userId, createServiceDetailsDto } = command;

        return this.serviceDetailsService.createServiceDetails(
            userId,
            createServiceDetailsDto,
        )
    }
}