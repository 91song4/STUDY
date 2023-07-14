import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
  });
}
bootstrap();
