import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetUserQuery} from "src/authorization/infrastructure/queries/get-user/get-user.query";
import {AuthorizationUserService} from "src/authorization/infrastructure/services/authorization-user.service";
import {User} from "src/authorization/domain/entities/user.entity";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
    constructor(private readonly userService: AuthorizationUserService) {}

    execute(query: GetUserQuery): Promise<User> {
        return this.userService.getUserBy(query.searchFieldOptionsDto);
    }
}