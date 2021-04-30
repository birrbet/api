import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './modules/app/app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalInterceptors(new ExceptionInterceptor(logger))
  await app.listen(process.env.GRAPHQL_PORT);
}
bootstrap();
