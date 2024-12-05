import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";

import { Project } from "src/project/domain/entities/project.entity";
import { ProjectRepository } from "src/project/domain/repositories/project.repository";
import { CreateProjectDto } from "src/project/domain/dto/create-project.dto";
import { ProjectNotFoundException } from "src/common/exceptions/400-client/404/project-not-found.exception";
import { ProjectAggregate } from "src/project/domain/aggregate/project.aggregate";
import { UpdateProjectDto } from "src/project/domain/dto/update-project.dto";
import { SearchFieldOptionsDto } from "src/common/dto/search-field-options.dto";

@Injectable()
export class ProjectService extends ProjectRepository {
    private readonly projectAggregate = new ProjectAggregate();

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: EntityRepository<Project>,
    ) {
        super();
    }

    async getProjectBy(searchFieldOptionsDto: SearchFieldOptionsDto<Project>): Promise<Project> {
        const { field, value } = searchFieldOptionsDto;

        const project = await this.projectRepository
            .createQueryBuilder()
            .where({ [field]: value })
            .getSingleResult();

        if (!project) {
            throw new ProjectNotFoundException();
        }
        return project;
    }

    async getProjectById(projectId: string): Promise<Project> {
        const project = await this.projectRepository
            .createQueryBuilder()
            .where({ id: projectId })
            .getSingleResult();

        if (!project) {
            throw new ProjectNotFoundException();
        }
        return project;
    }

    async getProjects(): Promise<Array<Project>> {
        return this.projectRepository
            .createQueryBuilder()
            .getResultList();
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const projectPayload = this.projectAggregate.createProject(createProjectDto);

        const projectInsertResult = await this.projectRepository
            .createQueryBuilder()
            .insert(projectPayload)
            .returning("id")
            .execute();

        return this.getProjectById(projectInsertResult.insertId);
    }

    async updateProject(updateProjectDto: UpdateProjectDto): Promise<Project> {
        return;
    }

    async deleteProject(projectId: string): Promise<void> {
        await this.projectRepository
            .createQueryBuilder()
            .delete()
            .from(Project)
            .where({ id: projectId })
            .execute();
    }
}