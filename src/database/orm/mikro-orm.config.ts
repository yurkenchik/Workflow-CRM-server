import {defineConfig} from '@mikro-orm/core';
import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {User} from '../../authorization/domain/entities/user.entity';
import {ServiceDetails} from '../../authorization/domain/entities/service-details.entity';
import {Profile} from '../../profile/domain/entities/profile.entity';
import {UserSettings} from '../../profile/domain/entities/user-settings.entity';
import {Project} from '../../project/domain/entities/project.entity';
import {Member} from '../../project/domain/entities/member.entity';
import {Task} from '../../project/domain/entities/task.entity';
import {ConfirmationCode} from "../../authorization/domain/entities/confirmation-code.entity";
import * as dotenv from 'dotenv';
import {Migrator} from "@mikro-orm/migrations";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export default defineConfig({
    driver: PostgreSqlDriver,
    host: process.env["DB_HOST"],
    port: Number(process.env["DB_PORT"]),
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    dbName: process.env["DB_NAME"],
    entities: [User, ServiceDetails, Profile, UserSettings, Project, Member, Task, ConfirmationCode],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    migrations: {
        path: './dist/database/migrations',
        pathTs: './src/database/migrations',
        glob: '!(*.d).{js,ts}',
    },
    extensions: [Migrator],
});