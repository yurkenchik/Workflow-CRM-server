import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CreateServiceDetailsDto } from "src/authorization/domain/dto/create-service-details.dto";
import { UserId } from "src/common/decorators/user-id.decorator";
import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";
import {
    CreateServiceDetailsCommand
} from "src/authorization/infrastructure/commands/create-service-details/create-service-details.command";

@Controller("service-details")
export class ServiceDetailsController {
    constructor(private readonly commandBus: CommandBus) {}

    @ApiOperation({ summary: "Creating service details" })
    @ApiBearerAuth()
    @ApiBody({ type: CreateServiceDetailsDto })
    @ApiResponse({ status: 201, type: ServiceDetails })
    @Post()
    async createServiceDetails(
        @UserId() userId: string,
        @Body() createServiceDetailsDto: CreateServiceDetailsDto
    ): Promise<ServiceDetails> {
        return this.commandBus.execute(new CreateServiceDetailsCommand(userId, createServiceDetailsDto));
    }
}