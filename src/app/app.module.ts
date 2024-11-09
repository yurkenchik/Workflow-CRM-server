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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
                    signOptions: {
                        expiresIn: configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_MS")
                    }
                };
            }
        }),
        PassportModule,
        AuthorizationModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
