import { Project } from "src/project/domain/entities/project.entity";
import { Member } from "src/project/domain/entities/member.entity";
import { User } from "src/authorization/domain/entities/user.entity";
import { Task } from "src/project/domain/entities/task.entity";
import { CreateProjectDto } from "src/project/domain/dto/create-project.dto";
import { CreateTaskDto } from "src/project/domain/dto/create-task.dto";
import { ProjectNotFoundException } from "src/common/exceptions/400-client/404/project-not-found.exception";
import { MemberNotFoundException } from "src/common/exceptions/400-client/404/member-not-found.exception";
import { UserNotFoundException } from "src/common/exceptions/400-client/404/user-not-found.exception";
import {CreateMemberDto} from "src/project/domain/dto/create-member.dto";

export class ProjectAggregate {

    createProject(createProjectDto: CreateProjectDto): Project {
        const { name, description  } = createProjectDto;

        const project = new Project();
        project.name = name;
        project.description = description;

        return project;
    }


    createMember(
        createMemberDto: CreateMemberDto,
        user: User,
        project: Project
    ): Member {
        const { name, avatarImageUrl } = createMemberDto;

        const member = new Member();
        member.name = name;
        member.avatarImageUrl = avatarImageUrl;

        if (!user) {
            throw new UserNotFoundException();
        }

        if (!member) {
            throw new MemberNotFoundException();
        }

        member.user = user;
        member.project = project;

        return member;
    }

    createTask(
        createTaskDto: CreateTaskDto,
        project: Project,
        member: Member,
    ): Task {
        const { title, description, priority, status, dueDate } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
        task.dueDate = dueDate;

        if (!project) {
            throw new ProjectNotFoundException();
        }

        if (!member) {
            throw new MemberNotFoundException();
        }

        task.project = project;

        task.members.add(member);
        member.tasks.add(task);

        return task;
    }

    addMemberToProject(project: Project, member: Member): Member {
        const existingMember = project.members.find((m: Member) => m.user.id === member.user.id);
        member.project = project;
        project.members.add(member);

        return member;
    }
}