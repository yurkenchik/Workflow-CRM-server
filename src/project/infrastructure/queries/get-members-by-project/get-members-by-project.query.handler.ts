import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Member } from 'src/project/domain/entities/member.entity';
import { GetMembersQuery } from 'src/project/infrastructure/queries/get-members/get-members.query';
import { MemberService } from 'src/project/infrastructure/services/member.service';

@QueryHandler(GetMembersQuery)
export class GetMembersQueryHandler implements IQueryHandler<GetMembersQuery> {
    constructor(private readonly memberService: MemberService) {}

    async execute(query: GetMembersQuery): Promise<Member> {}
}