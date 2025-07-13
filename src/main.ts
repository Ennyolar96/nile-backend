import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Nile Payout System API')
    .setDescription('RESTful API for Nile internal payout system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // CORS
  app.enableCors();

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log('🚀 Application is running on: http://localhost:3000');
  console.log('📚 Swagger docs available at: http://localhost:3000/api/docs');
}
bootstrap();
