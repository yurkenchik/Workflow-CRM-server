import { SearchFieldOptionsDto } from "src/common/dto/search-field-options.dto";
import { Project } from "src/project/domain/entities/project.entity";

export class GetProjectQuery {
    constructor(public readonly searchFieldOptionsDto: SearchFieldOptionsDto<Project>) {}
}