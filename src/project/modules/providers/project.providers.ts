import { ProjectService } from "src/project/infrastructure/services/project.service";
import { MemberService } from "src/project/infrastructure/services/member.service";
import { GetProjectQueryHandler } from "src/project/infrastructure/queries/get-project/get-project.query.handler";
import {
    CreateProjectCommandHandler
} from "src/project/infrastructure/commands/create-project/create-project.command.handler";

export const projectServices = [
    ProjectService,
    MemberService,
];

export const projectCommandHandlers = [
    CreateProjectCommandHandler
]

export const projectQueryHandlers = [
    GetProjectQueryHandler
];
