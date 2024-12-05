import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MikroOrmModule} from "@mikro-orm/nestjs";

import { ProjectService } from "src/project/infrastructure/services/project.service";
import { UserSharedModule } from "src/authorization/modules/user-shared.module";
import { Project } from "src/project/domain/entities/project.entity";
import { Member } from "src/project/domain/entities/member.entity";
import { Task } from "src/project/domain/entities/task.entity";
import {
    projectCommandHandlers,
    projectQueryHandlers,
    projectServices
} from "src/project/modules/providers/project.providers";
import { ProjectController } from "src/project/presentation/project.controller";

@Module({
    imports: [
        UserSharedModule,
        CqrsModule,
        MikroOrmModule.forFeature({ entities: [Project, Member, Task] })
    ],
    providers: [ ...projectServices, ...projectCommandHandlers,...projectQueryHandlers ],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}