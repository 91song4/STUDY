import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 유효성 검사 파이프
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
  });
}
bootstrap();
