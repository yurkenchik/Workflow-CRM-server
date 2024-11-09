import {Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Task} from "./task.entity";
import {Project} from "./project.entity";
import { v4 as uuid } from "uuid";
import {User} from "../../../authorization/domain/entities/user.entity";

@Entity()
export class Member {
    @PrimaryKey()
    id: string = uuid();

    @ManyToOne(() => Project)
    project!: Project;

    @ManyToOne(() => User)
    user: User;

    @ManyToMany({ entity: () => Task })
    tasks = new Collection<Task>(this);
}