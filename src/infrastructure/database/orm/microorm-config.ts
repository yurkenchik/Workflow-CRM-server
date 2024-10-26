import {Options} from "@mikro-orm/core";
import {ConfigService} from "@nestjs/config";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {join} from "path";

console.log(join(__dirname, './../migrations'));

export const getMikroOrmConfig = (configService: ConfigService): Options => ({
    driver: PostgreSqlDriver,
    // @ts-ignore
    type: "postgresql",
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    dbName: configService.get<string>('DB_NAME'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    entities: [join(__dirname, './../../../../dist/domain/entities/**/*.js')],
    entitiesTs: [join(__dirname, './../../../../src/domain/entities/**/*.ts')],
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
        path: join(__dirname, './../migrations'),
        pathTs: join(__dirname, './../migrations'),
    },
    debug: true
});