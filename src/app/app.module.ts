import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {getMikroOrmConfig} from "../infrastructure/database/orm/microorm-config";
import {UserModule} from "../modules/user.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as process from "node:process";
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMikroOrmConfig
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
