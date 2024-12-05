import {Body, Controller, Post} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProjectDto } from "src/project/domain/dto/create-project.dto";
import { Project } from "src/project/domain/entities/project.entity";
import { CreateProjectCommand } from "src/project/infrastructure/commands/create-project/create-project.command";

@Controller('projects')
export class ProjectController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.commandBus.execute(new CreateProjectCommand(createProjectDto));
    }
}