import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt/jwt.guard.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // auto validation DTO, whitelist deletes undefined fields
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('TakePulse API Documentation')
    .setDescription('TakePulse API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
