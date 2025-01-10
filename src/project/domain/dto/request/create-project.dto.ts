import { ApiProperty } from "@nestjs/swagger";
import { ProjectStatus } from "src/common/enums/project-status.enum";

export class CreateProjectDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
}