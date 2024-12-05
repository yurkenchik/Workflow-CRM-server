import { ProjectService } from "src/project/infrastrcuture/services/project.service";
import { MemberService } from "src/project/infrastrcuture/services/member.service";
import { GetProjectQueryHandler } from "src/project/infrastrcuture/queries/get-project/get-project.query.handler";

export const projectServices = [
    ProjectService,
    MemberService,
];

export const projectQueryHandlers = [
    GetProjectQueryHandler
];