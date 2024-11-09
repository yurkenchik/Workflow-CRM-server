import {Injectable} from "@nestjs/common";
import {MikroOrmModuleOptions, MikroOrmOptionsFactory} from "@mikro-orm/nestjs";
import {ConfigService} from "@nestjs/config";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {User} from "../authorization/domain/entities/user.entity";
import {ServiceDetails} from "../authorization/domain/entities/service-details.entity";
import {Profile} from "../profile/domain/entities/profile.entity";
import {UserSettings} from "../profile/domain/entities/user-settings.entity";
import {Project} from "../project/domain/entities/project.entity";
import {Member} from "../project/domain/entities/member.entity";
import {Task} from "../project/domain/entities/task.entity";
import {defineConfig} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Migrator} from "@mikro-orm/migrations";

@Injectable()
export class DatabaseService implements MikroOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    private readonly entities = [User, ServiceDetails, Profile, UserSettings, Project, Member, Task];

    createMikroOrmOptions(contextName?: string): MikroOrmModuleOptions {
        return defineConfig({
            driver: PostgreSqlDriver,
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            dbName: this.configService.get<string>('DB_NAME'),
            entities: this.entities,
            entitiesTs: this.entities,
            metadataProvider: TsMorphMetadataProvider,
            debug: true,
            migrations: {
                path: "./dist/database/migrations",
                pathTs: "./src/database/migrations",
                glob: "!(*.d).{js,ts}",
            },
            extensions: [Migrator],
        });
    }
}