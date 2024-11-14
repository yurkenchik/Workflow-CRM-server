import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as process from "node:process";
import * as dotenv from 'dotenv';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {DatabaseService} from "../database/database.service";
import {AuthorizationModule} from "../authorization/authorization.module";
import {EmailModule} from "../messaging/modules/email.module";
import {CronJobsModule} from "../cron-jobs/cron-jobs.module";
import {ScheduleModule} from "@nestjs/schedule";
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        MikroOrmModule.forRootAsync({
            useClass: DatabaseService
        }),
        ScheduleModule.forRoot(),
        JwtModule,
        PassportModule,
        AuthorizationModule,
        EmailModule,
        CronJobsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
