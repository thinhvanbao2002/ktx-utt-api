import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './bootstraps';
import { HttpResponseInterceptor } from './common/interceptors/handleresponse.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  setupSwagger(app);
  await app.listen(3009);
}

bootstrap();
