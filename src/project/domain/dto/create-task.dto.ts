import { TaskPriority } from "src/common/enums/task-priority.enum";
import { TaskStatus } from "src/common/enums/task-status.enum";

export class CreateTaskDto {
    readonly title: string;
    readonly description: string;
    readonly priority!: TaskPriority;
    readonly status: TaskStatus;
    readonly dueDate: Date = new Date();
}