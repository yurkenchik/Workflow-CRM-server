import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectCommand } from "src/project/infrastructure/commands/create-project/create-project.command";
import { ProjectService } from "src/project/infrastructure/services/project.service";
import { Project } from "src/project/domain/entities/project.entity";

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand> {
    constructor(private readonly projectService: ProjectService) {}

    execute(command: CreateProjectCommand): Promise<Project> {
        return this.projectService.createProject(command.createProjectDto);
    }
}