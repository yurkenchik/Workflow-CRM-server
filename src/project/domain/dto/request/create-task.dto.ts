import { ApiProperty } from "@nestjs/swagger";
import { TaskPriority } from "src/common/enums/task-priority.enum";
import { TaskStatus } from "src/common/enums/task-status.enum";

export class CreateTaskDto {
    @ApiProperty()
    readonly title: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly priority!: TaskPriority;
    @ApiProperty()
    readonly status: TaskStatus;
    @ApiProperty()
    readonly dueDate: Date = new Date();
}