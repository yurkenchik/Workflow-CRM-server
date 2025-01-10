import { Member } from 'src/project/domain/entities/member.entity';
import { SearchFieldOptionsDto } from 'src/common/dto/search-field-options.dto';

export class GetMemberQuery {
    constructor(public readonly searchFieldOptionsDto: SearchFieldOptionsDto<Member>) {}
}