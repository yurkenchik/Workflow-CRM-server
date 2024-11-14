import {Project} from "../entities/project.entity";
import {Member} from "../entities/member.entity";

export class ProjectAggregate {
    private readonly project: Project;

    constructor(project: Project) {
        this.project = project;
    }

    getProject(): Project {
        return this.project;
    }

    addMemberToProject(member: Member): Member {
        const isMemberAdded = this.project.members.find((mb: Member) => mb.id === member.id);

        if (isMemberAdded) {
            throw new Error("Member already exists");
        }

        this.project.members.add(member);
        return member;
    }
}