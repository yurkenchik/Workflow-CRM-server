import { ProjectService } from "src/project/infrastructure/services/project.service";
import { MemberService } from "src/project/infrastructure/services/member.service";
import { GetProjectQueryHandler } from "src/project/infrastructure/queries/get-project/get-project.query.handler";

export const projectServices = [
    ProjectService,
    MemberService,
];

export const projectQueryHandlers = [
    GetProjectQueryHandler
];