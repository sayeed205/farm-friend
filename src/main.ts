import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  const GLOBAL_PREFIX = 'api';
  app.setGlobalPrefix(GLOBAL_PREFIX);

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('FarmFriend API')
      .setDescription('API description for FarmFriend app')
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, document);
  }

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  if (process.env.NODE_ENV !== 'production') {
    Logger.log(`Server running on port ${PORT}`);
  }
}
bootstrap();
