import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";

import { Member } from "src/project/domain/entities/member.entity";
import { GetUserQuery } from "src/authorization/infrastructure/queries/get-user/get-user.query";
import { ProjectService } from "src/project/infrastructure/services/project.service";
import { ProjectAggregate } from "src/project/domain/aggregate/project.aggregate";
import { SearchFieldOptionsDto } from "src/common/dto/search-field-options.dto";
import { MemberNotFoundException } from "src/common/exceptions/400-client/404/member-not-found.exception";
import { CreateMemberDto } from "src/project/domain/dto/create-member.dto";

@Injectable()
export class MemberService {
    private readonly projectAggregate: ProjectAggregate;

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: EntityRepository<Member>,
        private readonly commandBus: CommandBus,
        private readonly projectService: ProjectService,
    ) {}

    async getMemberBy(searchFieldOptionsDto: SearchFieldOptionsDto<Member>): Promise<Member> {
        const { field, value } = searchFieldOptionsDto;

        const member = await this.memberRepository
            .createQueryBuilder()
            .where({ [field]: value })
            .getSingleResult();

        if (!member) {
            throw new MemberNotFoundException();
        }
        return member;
    }

    async createMember(
        userId: string,
        projectId: string,
        createMemberDto: CreateMemberDto,
    ): Promise<Member> {
        const user = await this.commandBus.execute(new GetUserQuery({
            field: "id",
            value: userId,
        }));

        const project = await this.projectService.getProjectBy({
            field: "id",
            value: projectId,
        });

        const memberPayload = this.projectAggregate.createMember(createMemberDto, user, project);

        const memberInsertResult = await this.memberRepository
            .createQueryBuilder()
            .insert(memberPayload)
            .returning("id")
            .execute();

        return this.getMemberBy({
            field: "id",
            value: memberInsertResult.insertId
        });
    }
}