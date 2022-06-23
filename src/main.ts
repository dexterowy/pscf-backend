import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from './config/config.dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('PhotoHUB')
    .setDescription('The PhotoHUB API description')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerDocumentOptions = {};

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    customOptions,
  );
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3333',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
  });
  await app.listen(config.port);
  console.log(`Listening on port ${config.port}...`);
}
bootstrap();
