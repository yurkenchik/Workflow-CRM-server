import {SearchFieldOptionsDto} from "src/common/dto/search-field-options.dto";
import {User} from "src/authorization/domain/entities/user.entity";

export class GetUserQuery {
    constructor(public readonly searchFieldOptionsDto: SearchFieldOptionsDto<User>) {}
}