import { ProjectStatus } from "src/common/enums/project-status.enum";

export class CreateProjectDto {
    readonly name: string;
    readonly description: string;
}