import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProjectDto } from "src/project/domain/dto/create-project.dto";
import { Project } from "src/project/domain/entities/project.entity";
import { CreateProjectCommand } from "src/project/infrastructure/commands/create-project/create-project.command";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Project")
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @ApiOperation({ summary: 'Creating a project' })
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 201, type: Project })
    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.commandBus.execute(new CreateProjectCommand(createProjectDto));
    }
}