import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Automatic Swagger documentation for NestJS project')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
