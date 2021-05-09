import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './modules/app/app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as rateLimit from 'express-rate-limit';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.enableCors();
  app.use(compression());
  // app.use(helmet());
  app.use(cookieParser());
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalInterceptors(new ExceptionInterceptor(logger));
  await app.listen(process.env.GRAPHQL_PORT);
}
bootstrap();
