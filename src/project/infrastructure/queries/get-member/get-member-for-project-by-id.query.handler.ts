import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMemberQuery } from 'src/project/infrastructure/queries/get-member/get-member.query';
import { MemberService } from 'src/project/infrastructure/services/member.service';
import { Member } from 'src/project/domain/entities/member.entity';

@QueryHandler(GetMemberQuery)
export class GetMemberQueryHandler implements IQueryHandler<GetMemberQuery> {
    constructor(private readonly memberService: MemberService) {}

    async execute(query: GetMemberQuery): Promise<Member> {
        return this.memberService.getMemberBy(query.searchFieldOptionsDto);
    }
}