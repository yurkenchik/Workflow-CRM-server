import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap(): Promise<void> {
    const configService = new ConfigService();
    const app = await NestFactory.create(AppModule);
    const PORT = configService.get<string>('PORT');

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
