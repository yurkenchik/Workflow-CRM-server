import { Module } from '@nestjs/common';
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MikroOrmModule} from "@mikro-orm/nestjs";

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseService } from "src/database/database.service";
import { AuthorizationModule } from "src/authorization/modules/authorization.module";
import { MessagingModule } from "src/messaging/modules/messaging.module";
import { CronJobsModule } from "src/cron-jobs/cron-jobs.module";

import * as process from "node:process";
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import {ProjectModule} from "src/project/modules/project.module";
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
        MessagingModule,
        CronJobsModule,
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 100,
        }]),
        ProjectModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
})
export class AppModule {}
