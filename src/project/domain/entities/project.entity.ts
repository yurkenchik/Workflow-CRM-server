import {Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {ProjectStatus} from "../../../common/enums/project-status.enum";
import { v4 as uuid } from "uuid";
import {Task} from "./task.entity";
import {Member} from "./member.entity";

@Entity()
@Unique({ properties: ["name"] })
export class Project {
    @PrimaryKey()
    id: string = uuid();

    @Property()
    @Unique()
    name: string;

    @Property()
    description: string;

    @Enum(() => ProjectStatus)
    status!: ProjectStatus;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();

    @OneToMany(() => Member, member => member.project)
    members: Collection<Member> = new Collection<Member>(this);

    @OneToMany(() => Task, task => task.project)
    tasks: Collection<Task, object> = new Collection<Task>(this);
}