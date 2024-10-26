import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {getMikroOrmConfig} from "../infrastructure/database/orm/microorm-config";
import {UserModule} from "../modules/user.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as process from "node:process";
import * as dotenv from 'dotenv';
import {JwtModule} from "@nestjs/jwt";
import {jwtConfig} from "../common/utils/jwt.config";
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
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtConfigFactory = jwtConfig(configService);

                return {
                    secret: jwtConfigFactory.secretKey,
                    signOptions: {
                        expiresIn: jwtConfigFactory.signOptions.expiresIn
                    }
                };
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
