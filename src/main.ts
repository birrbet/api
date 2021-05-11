import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './modules/app/app.module';
import { ExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as csurf from 'csurf';
// import * as rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.enableCors();
  app.use(compression());
  // app.use(helmet());
  app.use(cookieParser());
  // because we're using cookie we need to defend from cross site forgery attack
  app.use(csurf());
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalInterceptors(new ExceptionInterceptor(logger));
  await app.listen(configService.get('GRAPHQL_PORT'));
}
bootstrap();
