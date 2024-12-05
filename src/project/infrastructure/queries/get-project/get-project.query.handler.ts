import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Project } from "src/project/domain/entities/project.entity";
import { GetProjectQuery } from "src/project/infrastructure/queries/get-project/get-project.query";
import { ProjectService } from "src/project/infrastructure/services/project.service";

@QueryHandler(GetProjectQuery)
export class GetProjectQueryHandler implements IQueryHandler {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    async execute(query: GetProjectQuery): Promise<Project> {
        const { field, value } = query.searchFieldOptionsDto;

        return this.projectService.getProjectBy({
            field,
            value
        });
    }
}