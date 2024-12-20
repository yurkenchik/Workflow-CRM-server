import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import { Task } from "./task.entity";
import { Member } from "./member.entity";
import { ProjectStatus } from "src/common/enums/project-status.enum";

@Entity()
@Unique({ properties: ["name"] })
export class Project {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    name: string;

    @Property()
    description: string;

    @Enum(() => ProjectStatus)
    status: ProjectStatus = ProjectStatus.OPEN;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();

    @OneToMany(() => Member, member => member.project)
    members: Collection<Member> = new Collection<Member>(this);

    @OneToMany(() => Task, task => task.project)
    tasks: Collection<Task, object> = new Collection<Task>(this);
}