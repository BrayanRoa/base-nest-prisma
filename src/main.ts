import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // usado para que todas las responses tengan el mismo formato 
  app.useGlobalInterceptors(new ResponseInterceptor())

  // usado para dar un prefix global
  app.setGlobalPrefix("api/v1")

  // usado para validar datos de entrada en el body
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
