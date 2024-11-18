import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository, IsolationLevel } from "@mikro-orm/postgresql";

import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";
import { AuthorizationUserService } from "./authorization-user.service";
import { ServiceDetailsNotFoundException } from "src/common/exceptions/400-client/404/service-details-not-found.exception";

import { CreateServiceDetailsDto } from "src/authorization/domain/dto/create-service-details.dto";
import { Transactional } from "src/common/decorators/transactional.decorator";

@Injectable()
export class ServiceDetailsService {
    constructor(
        @InjectRepository(ServiceDetails)
        private readonly serviceDetailsRepository: EntityRepository<ServiceDetails>,
        private readonly userService: AuthorizationUserService,
        private readonly entityManager: EntityManager,
    ) {}

    async getServiceDetailsById(serviceDetailsId: string): Promise<ServiceDetails> {
        const serviceDetails = await this.serviceDetailsRepository
            .createQueryBuilder()
            .where({ id: serviceDetailsId })
            .getSingleResult();

        if (!serviceDetails) {
            throw new ServiceDetailsNotFoundException();
        }
        return serviceDetails;
    }

    @Transactional({ isolationLevel: IsolationLevel.REPEATABLE_READ })
    async createServiceDetails(
        userId: string,
        createServiceDetailsDto: CreateServiceDetailsDto
    ): Promise<ServiceDetails> {
        const user = await this.userService.getUserById(userId);
        const serviceDetailsInsertResult = await this.serviceDetailsRepository
            .createQueryBuilder()
            .insert({
                ...createServiceDetailsDto,
                user
            })
            .returning("id")
            .execute();

        const serviceDetails = await this.getServiceDetailsById(
            serviceDetailsInsertResult.insertId
        );

        await this.entityManager.persistAndFlush(serviceDetails);
        return serviceDetails;
    }
}