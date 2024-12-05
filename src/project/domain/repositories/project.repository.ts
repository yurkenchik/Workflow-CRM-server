import {Project} from "../entities/project.entity";
import {CreateProjectDto} from "../dto/create-project.dto";
import {UpdateProjectDto} from "../dto/update-project.dto";
import {SearchFieldOptionsDto} from "src/common/dto/search-field-options.dto";

export abstract class ProjectRepository {
    abstract getProjects(): Promise<Array<Project>>;
    abstract getProjectBy(searchFieldOptionsDto: SearchFieldOptionsDto<Project>): Promise<Project>;
    abstract createProject(createProjectDto: CreateProjectDto): Promise<Project>;
    abstract updateProject(updateProjectDto: UpdateProjectDto): Promise<Project>;
    abstract deleteProject(projectId: string): Promise<void>;
}