import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";

import { ServiceDetails } from "src/authorization/domain/entities/service-details.entity";
import { AuthorizationUserService } from "./authorization-user.service";
import { ServiceDetailsNotFoundException } from "src/common/exceptions/400-client/404/service-details-not-found.exception";
import { AuthorizationAggregate } from "src/authorization/domain/aggregate/authorization.aggregate";

import { CreateServiceDetailsDto } from "src/authorization/domain/dto/create-service-details.dto";

@Injectable()
export class ServiceDetailsService {
    private readonly authorizationAggregate: AuthorizationAggregate = new AuthorizationAggregate();

    constructor(
        @InjectRepository(ServiceDetails)
        private readonly serviceDetailsRepository: EntityRepository<ServiceDetails>,
        private readonly userService: AuthorizationUserService,
        private readonly entityManager: EntityManager,
    ) {}

    async getAllServiceDetails(): Promise<Array<ServiceDetails>> {
        return this.serviceDetailsRepository
            .createQueryBuilder()
            .select(this.getServiceDetailsFields())
            .getResultList();
    }

    async getServiceDetailsById(serviceDetailsId: string): Promise<ServiceDetails> {
        const serviceDetails = await this.serviceDetailsRepository
            .createQueryBuilder()
            .where({ id: serviceDetailsId })
            .select(this.getServiceDetailsFields())
            .getSingleResult();

        if (!serviceDetails) {
            throw new ServiceDetailsNotFoundException();
        }
        return serviceDetails;
    }

    async createServiceDetails(
        userId: string,
        createServiceDetailsDto: CreateServiceDetailsDto
    ): Promise<ServiceDetails> {
        const user = await this.userService.getUserBy({ field: "id", value: userId });
        const serviceDetailsBuilder = this.authorizationAggregate.createServiceDetails(user, createServiceDetailsDto);

        const serviceDetailsInsertResult = await this.serviceDetailsRepository
            .createQueryBuilder()
            .insert(serviceDetailsBuilder)
            .returning("id")
            .execute();

        const serviceDetails = await this.getServiceDetailsById(
            serviceDetailsInsertResult.insertId
        );

        await this.entityManager.persistAndFlush(serviceDetails);
        return serviceDetails;
    }

    private getServiceDetailsFields(): Array<keyof ServiceDetails> {
        return [
            "id",
            "companyName",
            "usagePurpose",
            "teamPeopleRange",
            "businessDirection",
            "personBestDescriptor",
        ];
    }
}