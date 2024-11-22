import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {join} from "path";

async function bootstrap(): Promise<void> {
    const configService = new ConfigService();
    const app = await NestFactory.create(AppModule);
    const PORT = configService.get<string>('PORT');

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    app.enableCors();

    const swaggerConfig = new DocumentBuilder()
        .setTitle("Workflow CRM API documentation")
        .setVersion("1.0.0")
        .addTag("Backend API")
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
