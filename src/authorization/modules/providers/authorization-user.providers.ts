import { AuthorizationUserService } from "src/authorization/infrastructure/services/authorization-user.service";
import { CreateUserCommand } from "src/authorization/infrastructure/commands/create-user/create-user.command";
import { UpdateUserCommand } from "src/authorization/infrastructure/commands/update-user/update-user.command";
import { GetUserQueryHandler } from "src/authorization/infrastructure/queries/get-user/get-user.query.handler";

export const userServices = [
    AuthorizationUserService
];

export const userCommandHandlers = [
    CreateUserCommand,
    UpdateUserCommand,
];

export const userQueryHandlers = [
    GetUserQueryHandler
];