import {Collection, Entity, Enum, ManyToMany, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Project} from "./project.entity";
import {Member} from "./member.entity";
import {TaskPriority} from "../../../common/enums/task-priority.enum";
import { v4 as uuid } from "uuid";
import {TaskStatus} from "../../../common/enums/task-status.enum";

@Entity()
export class Task {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    title: string;

    @Property()
    description: string;

    @Enum(() => TaskPriority)
    priority!: TaskPriority;

    @Enum(() => TaskStatus)
    status: TaskStatus;

    @ManyToOne(() => Project)
    project: Project;

    @ManyToMany({ entity: () => Member })
    members: Collection<Member> = new Collection<Member>(this);

    @Property()
    dueDate: Date = new Date();

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();
}