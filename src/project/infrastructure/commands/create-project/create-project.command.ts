import { CreateProjectDto } from "src/project/domain/dto/create-project.dto";

export class CreateProjectCommand {
    constructor(public readonly createProjectDto: CreateProjectDto ) {}
}